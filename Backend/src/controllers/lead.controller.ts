import { Response } from 'express';
import Lead, { ILead } from '../models/Lead.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { Parser } from 'json2csv';

// CREATE LEAD

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name, email, status, source } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: user._id,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// GET ALL LEADS
// FILTER + SEARCH + SORT + PAGINATION

export const getLeads = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      status,
      source,
      search,
      sort = 'latest',
      page = '1',
    } = req.query;

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const statusFilter =
      typeof status === 'string'
        ? (status as ILead['status'])
        : undefined;
    const sourceFilter =
      typeof source === 'string'
        ? (source as ILead['source'])
        : undefined;
    const searchFilter =
      typeof search === 'string' ? search : undefined;
    const sortOptionString =
      typeof sort === 'string' ? sort : 'latest';
    const pageString =
      typeof page === 'string' ? page : '1';

    const query: Record<string, unknown> = {
      createdBy: user._id,
    };

    // FILTER BY STATUS

    if (statusFilter) {
      query.status = statusFilter;
    }

    // FILTER BY SOURCE

    if (sourceFilter) {
      query.source = sourceFilter;
    }

    // SEARCH BY NAME OR EMAIL

    if (searchFilter) {
      query.$or = [
        {
          name: {
            $regex: searchFilter,
            $options: 'i',
          },
        },

        {
          email: {
            $regex: searchFilter,
            $options: 'i',
          },
        },
      ];
    }

    // PAGINATION

    const limit = 10;

    const currentPage = Number(pageString) || 1;

    const skip = (currentPage - 1) * limit;

    // SORTING

    const sortOption: Record<string, 1 | -1> =
      sortOptionString === 'oldest'
        ? { createdAt: 1 }
        : { createdAt: -1 };

    // TOTAL RECORDS

    const totalRecords = await Lead.countDocuments(query);

    const totalPages = Math.ceil(totalRecords / limit);

    // FETCH LEADS

    const leads = await Lead.find(query)
      .populate('createdBy', 'name email')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,

      pagination: {
        currentPage,
        totalPages,
        totalRecords,
      },

      count: leads.length,

      data: leads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// GET SINGLE LEAD

export const getSingleLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: user._id,
    }).populate('createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // Ownership check.
    // NOTE: createdBy is populated above, so it is a full User document,
    // not a raw ObjectId. Do NOT compare with String(lead.createdBy) —
    // Mongoose Document.toString() dumps the whole object, not the id,
    // so that comparison would always fail, even for the real owner.
    // .equals() works correctly whether createdBy is populated or not.
    if (
      user.role !== 'admin' &&
      !lead.createdBy.equals(user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// UPDATE LEAD

export const updateLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: user._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    const allowedUpdates = ['name', 'email', 'status', 'source'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update',
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// DELETE LEAD

export const deleteLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: user._id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: 'Lead deleted',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const exportLeadsCSV = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const leads = await Lead.find({
      createdBy: user._id,
    }).select(
      'name email status source createdAt'
    );

    const fields = [
      'name',
      'email',
      'status',
      'source',
      'createdAt',
    ];

    const json2csv = new Parser({ fields });

    const csv = json2csv.parse(leads);

    res.header(
      'Content-Type',
      'text/csv'
    );

    res.attachment('leads.csv');

    return res.send(csv);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};