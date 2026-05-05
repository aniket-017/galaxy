/**
 * Reassign sequential orders 1..n without violating a unique index on `order`.
 * Phase 1: move rows to temporary high orders; phase 2: assign final orders.
 */
const TEMP_ORDER_BASE = 3_000_000;

async function applyOrdersTwoPhase(Model, orderedIds) {
  if (!orderedIds || orderedIds.length === 0) return;

  for (let i = 0; i < orderedIds.length; i++) {
    await Model.findByIdAndUpdate(orderedIds[i], { order: TEMP_ORDER_BASE + i });
  }
  for (let i = 0; i < orderedIds.length; i++) {
    await Model.findByIdAndUpdate(orderedIds[i], { order: i + 1 });
  }
}

module.exports = { applyOrdersTwoPhase, TEMP_ORDER_BASE };
