import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './search.service.js';

export const searchEvents = asyncHandler(async (req, res) => {
  const result = await service.searchEvents(req.query);
  res.json(result);
});
