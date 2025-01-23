
const requiredFields = {
  SkinType: 'string',
  Conditions: 'string',
  Concerns: 'string',
  Zones: 'string',
  Treatment: 'string',
  Fragrance: 'string',
  Routine: 'string',
  Products: 'array'
};

function validateAirtableRecord(record) {
  const validation = {
    isValid: true,
    missingFields: [],
    invalidTypes: [],
    record: null
  };

  if (!record || !record.fields) {
    validation.isValid = false;
    validation.missingFields.push('fields');
    return validation;
  }

  for (const [field, type] of Object.entries(requiredFields)) {
    const value = record.fields[field];
    if (!value) {
      validation.isValid = false;
      validation.missingFields.push(field);
      continue;
    }

    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== type) {
      validation.isValid = false;
      validation.invalidTypes.push(`${field}: expected ${type}, got ${actualType}`);
    }
  }

  if (validation.isValid) {
    validation.record = {
      id: record.id,
      ...record.fields
    };
  }

  return validation;
}

function normalizeFieldValue(value) {
  if (Array.isArray(value)) {
    return value.map(v => v.toString().toLowerCase().trim());
  }
  return value.toString().toLowerCase().trim();
}

module.exports = {
  validateAirtableRecord,
  normalizeFieldValue,
  requiredFields
};
