/**
 * 極簡 JSON Schema 驗證器（只支援 module.schema.json 用到的關鍵字）。
 *
 * 目的：讓 `module.schema.json` 成為 SDK 的結構驗證來源，避免 schema 與
 * `validate-manifest.mjs` 各寫一套。跨欄位語意規則（前綴、保留集合、掛勾、
 * 路由前綴）仍由 `validate-manifest.mjs` 補上。
 *
 * 支援：type、required、properties、additionalProperties、items、enum、const、
 * pattern、minLength、minItems、minimum。
 */

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  if (Number.isInteger(value)) return "integer";
  return typeof value;
}

function matchesType(value, expected) {
  switch (expected) {
    case "object":
      return isPlainObject(value);
    case "array":
      return Array.isArray(value);
    case "string":
      return typeof value === "string";
    case "integer":
      return Number.isInteger(value);
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "boolean":
      return typeof value === "boolean";
    case "null":
      return value === null;
    default:
      return true;
  }
}

function sameValue(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function join(pathValue, key) {
  return pathValue ? `${pathValue}.${key}` : key;
}

/**
 * @param {unknown} value 要驗證的資料
 * @param {object} schema JSON Schema 片段
 * @param {string} [pathValue] 目前路徑（錯誤訊息用）
 * @returns {string[]} 錯誤訊息（空陣列＝通過）
 */
export function validateAgainstSchema(value, schema, pathValue = "") {
  const errors = [];
  if (!schema || typeof schema !== "object") return errors;

  if (schema.type && !matchesType(value, schema.type)) {
    errors.push(`${pathValue || "manifest"} 需為 ${schema.type}，實得 ${typeOf(value)}`);
    return errors;
  }

  if (schema.const !== undefined && !sameValue(value, schema.const)) {
    errors.push(`${pathValue || "manifest"} 必須為 ${JSON.stringify(schema.const)}`);
  }

  if (Array.isArray(schema.enum) && !schema.enum.some((item) => sameValue(item, value))) {
    errors.push(
      `${pathValue || "manifest"} 必須是 ${schema.enum.map((item) => JSON.stringify(item)).join("／")}`
    );
  }

  if (typeof value === "string") {
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(`${pathValue || "manifest"} 長度不可小於 ${schema.minLength}`);
    }
    if (schema.pattern) {
      let re = null;
      try {
        re = new RegExp(schema.pattern);
      } catch {
        re = null;
      }
      if (re && !re.test(value)) {
        errors.push(`${pathValue || "manifest"} 格式不符（${schema.pattern}），實得 ${JSON.stringify(value)}`);
      }
    }
  }

  if (typeof value === "number" && typeof schema.minimum === "number" && value < schema.minimum) {
    errors.push(`${pathValue || "manifest"} 不可小於 ${schema.minimum}`);
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${pathValue || "manifest"} 至少需要 ${schema.minItems} 項`);
    }
    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validateAgainstSchema(item, schema.items, `${pathValue}[${index}]`));
      });
    }
  }

  if (isPlainObject(value)) {
    for (const key of schema.required ?? []) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${pathValue || "manifest"} 缺少必填欄位 ${key}`);
      }
    }
    const properties = schema.properties ?? {};
    for (const [key, child] of Object.entries(properties)) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(...validateAgainstSchema(value[key], child, join(pathValue, key)));
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${pathValue || "manifest"} 不允許欄位 ${key}`);
        }
      }
    }
  }

  return errors;
}
