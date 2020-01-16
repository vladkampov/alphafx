const defaults = {
  CORE_API_DOMAIN: 'http://localhost:3000/mock',
};

const prefix = 'ALPHA_FX_';

export default key => process.env[`${prefix}${key}`] || defaults[key];
