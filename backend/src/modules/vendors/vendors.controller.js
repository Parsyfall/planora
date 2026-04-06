import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './vendors.service.js';

export const listVendors = asyncHandler(async (req, res) => {
  const result = await service.listVendors(req.query);
  res.json(result);
});

export const createVendor = asyncHandler(async (req, res) => {
  const result = await service.createVendor(req.body);
  res.status(201).json(result);
});

export const updateVendor = asyncHandler(async (req, res) => {
  const result = await service.updateVendor(req.params.id, req.body);
  res.json(result);
});

export const deleteVendor = asyncHandler(async (req, res) => {
  const result = await service.deleteVendor(req.params.id);
  res.json(result);
});
