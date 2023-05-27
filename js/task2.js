const getMyElement = (id) => document.querySelector(`#${id}`);
const drawData = (user) => {
  const divParent = document.createElement("div");
  divParent.classList = "col-3 m-3 p-3 border border-primary-3";
  const h3 = document.createElement("h3");
  h3.innerText = `title: ${user.title}`;
  divParent.appendChild(h3);
  const h4 = document.createElement("h4");
  h4.innerText = `status: ${user.status}`;
  divParent.appendChild(h4);
  const para = document.createElement("p");
  para.innerText = `description: ${user.description}`;
  divParent.appendChild(para);
  const divBtn = document.createElement("div");
  divParent.appendChild(divBtn);

  const changeBtn = document.createElement("button");
  changeBtn.classList = "btn btn-primary me-3";
  changeBtn.innerText = "Change Status";
  divBtn.appendChild(changeBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn btn-danger";
  deleteBtn.innerText = "Delete";
  divBtn.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function () {
    divParent.remove();
  });

  if (user.status == "completed") divParent.classList.add("bg-success");
  else divParent.classList.add("bg-warning");

  changeBtn.addEventListener("click", function () {
    divParent.classList.toggle("bg-success");
    divParent.classList.toggle("bg-warning");
    if (user.status == "completed") user.status = "incompleted";
    else user.status = "completed";
    h4.innerText = `status: ${user.status}`;
  });

  userData.appendChild(divParent);
};
const formElements = ["title", "description", "status"];
let ID = 1;
const errors = {};
const addUser = getMyElement("addUser");
const userData = getMyElement("userData");

addUser.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = {};
  let t = 0,
    d = 0;
  formElements.forEach(function (el) {
    if (el == "status")
      user[el] = addUser.elements[el].checked ? "completed" : "incompleted";
    else user[el] = addUser.elements[el].value.trim();
  });
  const title = user.title;
  //   console.log(title.length);
  if (!title.length) errors.title = "Title is empty";
  else if (title.length < 5 || title.length > 20)
    errors.title = "title must be between 5 and 20 characters";
  else {
    errors.title = "";
    addUser.elements.title.nextElementSibling.innerText = "";
    addUser.elements.title.nextElementSibling.classList.add("d-none");
    t = 1;
  }
  if (errors.title) {
    console.log(addUser.elements.title.nextElementSibling);
    addUser.elements.title.nextElementSibling.innerText = errors.title;
    addUser.elements.title.nextElementSibling.classList.remove("d-none");
  }
  const mess = user.description;
  //   console.log(mess.length);
  if (!mess.length) errors.mess = "description is empty";
  else if (mess.length < 5 || mess.length > 300)
    errors.mess = "title must be between 5 and 300 characters";
  else {
    errors.mess = "";
    addUser.elements.description.nextElementSibling.innerText = "";
    addUser.elements.description.nextElementSibling.classList.add("d-none");
    d = 1;
  }
  if (errors.mess) {
    console.log(addUser.elements.description.nextElementSibling);
    addUser.elements.description.nextElementSibling.innerText = errors.mess;
    addUser.elements.description.nextElementSibling.classList.remove("d-none");
  }
  if (t && d) {
    drawData(user);
    addUser.reset();
  }
});
