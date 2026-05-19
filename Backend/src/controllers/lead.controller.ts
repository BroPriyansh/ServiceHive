import { Response } from 'express';
import Lead from '../models/Lead.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { Parser } from 'json2csv';

// CREATE LEAD

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user._id,
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

    const query: Record<string, any> = {};

    // FILTER BY STATUS

    if (status) {
      query.status = status;
    }

    // FILTER BY SOURCE

    if (source) {
      query.source = source;
    }

    // SEARCH BY NAME OR EMAIL

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },

        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    // PAGINATION

    const limit = 10;

    const currentPage = Number(page) || 1;

    const skip = (currentPage - 1) * limit;

    // SORTING

    const sortOption: Record<string, 1 | -1> =
      sort === 'oldest'
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
    const lead = await Lead.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
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
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // RBAC

    if (
      req.user.role !== 'admin' &&
      String(lead.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
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
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    // RBAC

    if (
      req.user.role !== 'admin' &&
      String(lead.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
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
    const leads = await Lead.find().select(
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