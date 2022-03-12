export const emailPattern = new RegExp(/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/);
export const passwordPattern = new RegExp(/^[\d.\w@-]{7,20}$/, "i");
export const namePattern = new RegExp(/^[a-z -]{3,}$/, "i");
