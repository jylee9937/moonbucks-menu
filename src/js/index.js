const menuList = document.querySelector("#espresso-menu-list");
const addMenuForm = document.querySelector("#espresso-menu-form");
const addMenuBtn = addMenuForm.submit;
const addMenuInput = addMenuForm.espressoMenuName;
const listTemplate = (name) => {
  return `
  <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
  <button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
  수정
  </button>
  <button
  type="button"
  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
  삭제
  </button>
  </li>
  `;
};

addMenuBtn.addEventListener("click", (e) => {
  const name = addMenuForm.espressoMenuName.value;
  if (name === "") return;
  menuList.insertAdjacentHTML("beforeend", listTemplate(name));
  // Input 비우기
  addMenuForm.reset();

  updateMenuCount();
});

addMenuForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

addMenuInput.addEventListener("keypress", (e) => {
  const name = addMenuForm.espressoMenuName.value;
  if (window.event.keyCode !== 13 || name === "") return;
  menuList.insertAdjacentHTML("beforeend", listTemplate(name));
  // Input 비우기
  addMenuForm.reset();
  updateMenuCount();
});

document.querySelector("#espresso-menu-list").addEventListener("click", (e) => {
  if (!e.target.classList.contains("menu-edit-button")) return;
  const menuName = e.target.closest("li").querySelector(".menu-name");
  const prevMenuName = menuName.innerText;
  const updatedMenuName = prompt("수정할 값을 입력해주세요.", prevMenuName);
  menuName.innerText = updatedMenuName;
});

document.querySelector("#espresso-menu-list").addEventListener("click", (e) => {
  if (!e.target.classList.contains("menu-remove-button")) return;
  const menuName = e.target.closest("li").querySelector(".menu-name");
  if (!confirm(`${menuName.innerText}을(를) 삭제하시겠습니까?`)) return;
  e.target.closest("li").remove();
  updateMenuCount();
});

function updateMenuCount() {
  const menuCount = document.querySelector(".menu-count");
  menuCount.innerText = `총 ${menuList.childElementCount}개`;
}
