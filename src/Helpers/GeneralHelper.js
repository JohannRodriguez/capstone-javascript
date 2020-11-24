const inputValidation = (string, arr) => {
  if (string.length < 3) { return 'The name is too short'; }
  if (string.length > 10) { return 'The name is too long'; }
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(string) === true) {
    return "The name can't contain special characters";
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].user === string) {
      return 'This name is taken';
    }
  }
  return 'Your score will be submited shortly, you can return now';
};

const spawnReset = () => {
  const chance = Math.floor((Math.random() * 10) + 1);
  if (chance <= 15) {
    return 600;
  } else if (chance <= 35) {
    return 2200;
  } else if (chance <= 70) {
    return 3000;
  }
  return 3500;
}

export { inputValidation, spawnReset} ;