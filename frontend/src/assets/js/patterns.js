export const emailPattern = new RegExp(/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)
export const passwordPattern = new RegExp(/^[\d.\w@-]{7,20}$/, 'i')
export const namePattern = new RegExp(/^[a-z -]{3,}$/, 'i')
export const phonePattern = new RegExp(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/)
