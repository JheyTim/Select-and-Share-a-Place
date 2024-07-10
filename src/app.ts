// Code goes here!

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

form?.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const enteredAddress = addressInput.value;
});
