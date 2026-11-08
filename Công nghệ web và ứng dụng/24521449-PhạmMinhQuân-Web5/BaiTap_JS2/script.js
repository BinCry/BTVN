"use strict";
const $ = (selector) => document.querySelector(selector);
const formatter = new Intl.NumberFormat("vi-VN");
function calculateRectangle() { const form = $("#rectangle-form"); $("#rectangle-area").textContent = Number(form.length.value) * Number(form.width.value); }
$("#rectangle-form").addEventListener("submit", (event) => { event.preventDefault(); calculateRectangle(); }); calculateRectangle();
function calculateGrade() { const form = $("#grade-form"), average = (Number(form.first.value) + Number(form.second.value) * 2) / 3; $("#average").textContent = average.toFixed(2); $("#promotion").textContent = average >= 5 ? "Được lên lớp" : "Ở lại lớp"; $("#rank").textContent = average >= 8 ? "Giỏi" : average >= 6.5 ? "Khá" : average >= 5 ? "Trung bình" : "Yếu"; }
$("#grade-form").addEventListener("submit", (event) => { event.preventDefault(); calculateGrade(); }); calculateGrade();
const stems = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"], branches = ["Tý", "Sửu", "Dần", "Mẹo", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const mod = (number, divisor) => ((number % divisor) + divisor) % divisor;
function lunarYear(year) { return `${stems[mod(year - 4, 10)]} ${branches[mod(year - 4, 12)]}`; }
const zodiacAnimals = [
  ["rat", "Con chuột"], ["buffalo", "Con trâu"], ["tiger", "Con hổ"],
  ["cat", "Con mèo"], ["dragon", "Con rồng"], ["snake", "Con rắn"],
  ["horse", "Con ngựa"], ["goat", "Con dê"], ["monkey", "Con khỉ"],
  ["rooster", "Con gà"], ["dog", "Con chó"], ["pig", "Con heo"]
];
function updateLunarYear() {
  const input = $("#lunar-form").elements.year;
  const year = Number(input.value);
  input.setCustomValidity(Number.isSafeInteger(year) && year > 0 ? "" : "Vui lòng nhập năm nguyên dương hợp lệ.");
  if (!input.reportValidity()) return;
  const index = mod(year - 4, 12);
  const [file, name] = zodiacAnimals[index];
  $("#lunar-result").textContent = lunarYear(year);
  $("#zodiac-image").src = `image/${file}.svg`;
  $("#zodiac-image").alt = `Con giáp ${branches[index]}: ${name.toLocaleLowerCase("vi")}`;
  $("#zodiac-caption").textContent = `${lunarYear(year)} · ${name}`;
}
$("#lunar-form").elements.year.addEventListener("input", (event) => event.target.setCustomValidity(""));
$("#lunar-form").addEventListener("submit", (event) => { event.preventDefault(); updateLunarYear(); });
updateLunarYear();
function calculateDays() {
  const form = $("#days-form"), month = Number(form.month.value), year = Number(form.year.value);
  const leap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  $("#days-result").textContent = `Tháng ${month} năm ${year} có ${days} ngày`;
}
$("#days-form").addEventListener("submit", (event) => { event.preventDefault(); calculateDays(); }); calculateDays();
function calculateSequence() { const form = $("#sequence-form"), start = Number(form.start.value), end = Number(form.end.value); if (start > end) { [form.start.value, form.end.value] = [end, start]; } const values = Array.from({ length: Number(form.end.value) - Number(form.start.value) + 1 }, (_, index) => Number(form.start.value) + index); $("#sequence-sum").textContent = values.reduce((total, value) => total + value, 0); $("#sequence-product").textContent = values.reduce((total, value) => total * value, 1); $("#sequence-even").textContent = values.filter((value) => value % 2 === 0).reduce((total, value) => total + value, 0); $("#sequence-odd").textContent = values.filter((value) => value % 2 !== 0).reduce((total, value) => total + value, 0); }
$("#sequence-form").addEventListener("submit", (event) => { event.preventDefault(); calculateSequence(); }); calculateSequence();
function multiplicationTables() { const form = $("#multiplication-form"), start = Math.min(Number(form.start.value), Number(form.end.value)), end = Math.max(Number(form.start.value), Number(form.end.value)); $("#multiplication-result").innerHTML = Array.from({ length: end - start + 1 }, (_, offset) => { const base = start + offset; return `<div class="table">${Array.from({ length: 10 }, (_, index) => `${base} x ${index + 1} = ${base * (index + 1)}`).join("<br />")}</div>`; }).join(""); }
$("#multiplication-form").addEventListener("submit", (event) => { event.preventDefault(); multiplicationTables(); }); multiplicationTables();
const digitWords = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
function readTwoDigits(tens, units, forceFull) {
  if (tens === 0) return units === 0 ? "" : `${forceFull ? "lẻ " : ""}${digitWords[units]}`;
  const prefix = tens === 1 ? "mười" : `${digitWords[tens]} mươi`;
  const unitText = units === 0 ? "" : units === 1 && tens > 1 ? "mốt" : units === 5 ? "lăm" : digitWords[units];
  return `${prefix}${unitText ? ` ${unitText}` : ""}`;
}
function readThreeDigits(value) { if (value === 0) return "Không"; const hundreds = Math.floor(value / 100), remainder = value % 100; const words = hundreds ? `${digitWords[hundreds]} trăm${remainder ? ` ${readTwoDigits(Math.floor(remainder / 10), remainder % 10, remainder < 10)}` : ""}` : readTwoDigits(Math.floor(remainder / 10), remainder % 10, false); return words.charAt(0).toUpperCase() + words.slice(1); }
function updateWords() { $("#number-words").textContent = readThreeDigits(Number($("#read-number-form").number.value)); }
$("#read-number-form").addEventListener("submit", (event) => { event.preventDefault(); updateWords(); }); updateWords();
// Four dishes shown in the PDF's bill example each cost 100,000 VND.
// The remaining prices are sample data because the PDF does not specify them.
const foods = [{ name: "Bò nấu đậu Hà Lan", price: 120000 }, { name: "Chả giò tôm", price: 100000 }, { name: "Chè hạt sen", price: 100000 }, { name: "Cơm dương châu", price: 100000 }, { name: "Gỏi ngó sen", price: 100000 }, { name: "Lẩu cá diêu hồng", price: 180000 }, { name: "Lẩu Thái Lan", price: 180000 }, { name: "Gà hấp chao", price: 160000 }, { name: "Heo sữa quay", price: 250000 }, { name: "Khai vị", price: 60000 }, { name: "Lẩu hải sản", price: 200000 }, { name: "Trái cây", price: 50000 }];
const menuList = $("#menu-list"), chosenList = $("#chosen-list");
function addOption(select, food) { const option = new Option(food.name, String(food.price)); option.dataset.name = food.name; select.add(option); }
foods.forEach((food) => addOption(menuList, food));
function moveOptions(source, destination, all) {
  Array.from(source.options).filter((option) => all || option.selected).forEach((option) => { option.selected = false; destination.add(option); });
  $("#party-total").textContent = "Danh sách đã thay đổi. Nhấn Tính tiền để cập nhật.";
}
document.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => { const move = button.dataset.move; moveOptions(move.includes("right") ? menuList : chosenList, move.includes("right") ? chosenList : menuList, move.startsWith("all")); }));
$("#calculate-party").addEventListener("click", () => { const selected = Array.from(chosenList.options), total = selected.reduce((sum, option) => sum + Number(option.value), 0); $("#party-total").textContent = `Số tiền thanh toán là: ${formatter.format(total)} đồng`; $("#bill-details").textContent = selected.length ? `${selected.map((option) => `${option.textContent}: ${formatter.format(Number(option.value))} đồng`).join("\n")}\n\nTổng cộng: ${formatter.format(total)} đồng` : "Chưa chọn món ăn nào."; $("#detail-dialog").showModal(); });
$("#close-dialog").addEventListener("click", () => $("#detail-dialog").close());
$("#hobbies-form").addEventListener("submit", (event) => { event.preventDefault(); const hobbies = Array.from(event.currentTarget.querySelectorAll("input[name=hobby]:checked"), (input) => input.value); const color = event.currentTarget.querySelector("input[name=color]:checked").value; window.alert(`Sở thích của bạn là: ${hobbies.join(", ") || "Chưa chọn"}\nMàu bạn thích nhất là: ${color}`); });
const weekdayForm = $("#weekday-form"), today = new Date(), currentYear = today.getFullYear();
function populateSelect(select, values, selected) { select.innerHTML = values.map((value) => `<option value="${value}"${Number(value) === selected ? " selected" : ""}>${value}</option>`).join(""); }
populateSelect(weekdayForm.day, Array.from({ length: 31 }, (_, index) => index + 1), today.getDate()); populateSelect(weekdayForm.month, Array.from({ length: 12 }, (_, index) => index + 1), today.getMonth() + 1); populateSelect(weekdayForm.year, Array.from({ length: 21 }, (_, index) => currentYear - 10 + index), currentYear);
$("#weekday-form").addEventListener("submit", (event) => { event.preventDefault(); const { day, month, year } = event.currentTarget, date = new Date(Number(year.value), Number(month.value) - 1, Number(day.value)); $("#weekday-result").textContent = date.getFullYear() === Number(year.value) && date.getMonth() === Number(month.value) - 1 ? `Ngày ${day.value} tháng ${month.value} năm ${year.value} là ngày ${date.toLocaleDateString("vi-VN", { weekday: "long" }).replace(/^./, (letter) => letter.toUpperCase())}` : "Ngày đã chọn không hợp lệ. Vui lòng kiểm tra lại."; });
