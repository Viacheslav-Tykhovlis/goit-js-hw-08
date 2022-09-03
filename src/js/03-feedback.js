const throttle = require('lodash.throttle');

const storageAPI = {
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  },

  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  },
};

const form = document.querySelector('.feedback-form');
startData();
form.addEventListener('input', throttle(onPullForm, 500));
form.addEventListener('submit', clickSubmit);

function onPullForm(evt) {
  const { name, value } = evt.target;

  let savedData = storageAPI.load('feedback-form-state');
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storageAPI.save('feedback-form-state', savedData);
  console.log(savedData);
}

function startData() {
  const savedData = storageAPI.load('feedback-form-state');
  if (!savedData) {
    return;
  }
  Object.entries(savedData).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

function clickSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  storageAPI.remove('feedback-form-state');
}
