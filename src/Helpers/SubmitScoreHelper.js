const inputValidation = (string, arr) => {
  if (string.length < 3) { return 'The name is too short'; }
  if (string.length > 10) { return 'The name is too long'; }
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(string) === true) {
    return "The name can't contain special characters";
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].user === string) {
      return 'This name is taken';
    }
  }
  return 'Your score will be submited shortly, you can return now';
};

export default inputValidation ;