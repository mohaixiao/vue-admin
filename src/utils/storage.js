/**
 * 移除所有 localStorage 项
 */
export function removeAllItem() {
  localStorage.clear()
}

/**
 * 获取 localStorage 项
 */
export function getItem(key) {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

/**
 * 设置 localStorage 项
 */
export function setItem(key, value) {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * 移除 localStorage 项
 */
export function removeItem(key) {
  localStorage.removeItem(key)
}
