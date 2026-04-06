import { AppError } from '../../common/errors/AppError.js';
import { requireFields } from '../../common/utils/validators.js';
import * as repo from './vendors.repository.js';

export const listVendors = async (query) => repo.listVendors(query);

export const createVendor = async (payload) => {
  requireFields(payload, ['name', 'category', 'location']);
  return repo.createVendor({
    name: String(payload.name).trim(),
    category: String(payload.category).trim(),
    location: String(payload.location).trim(),
    email: payload.email ? String(payload.email).trim() : null,
    phone: payload.phone ? String(payload.phone).trim() : null
  });
};

export const updateVendor = async (id, payload) => {
  const vendor = await repo.findById(id);
  if (!vendor) {
    throw new AppError('Vendor not found', 404);
  }
  return repo.updateVendor(id, payload);
};

export const deleteVendor = async (id) => {
  const vendor = await repo.findById(id);
  if (!vendor) {
    throw new AppError('Vendor not found', 404);
  }
  await repo.deleteVendor(id);
  return { success: true };
};
