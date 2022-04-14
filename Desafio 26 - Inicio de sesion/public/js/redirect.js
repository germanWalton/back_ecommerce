const redirect = () => {
  location.replace(`${location.origin}/`)
};

setTimeout(redirect, 2000);