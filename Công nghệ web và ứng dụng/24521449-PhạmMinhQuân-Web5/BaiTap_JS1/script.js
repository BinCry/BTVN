"use strict";
const $ = (selector) => document.querySelector(selector);
const message = (id, html) => { $(id).innerHTML = html; };
const numberText = (number) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 6 }).format(number);
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

function selectExercise(target) {
  document.querySelectorAll("#exercise-nav button, .exercise").forEach((item) => item.classList.remove("active"));
  document.querySelector(`#exercise-nav button[data-target="${target}"]`).classList.add("active");
  $("#" + target).classList.add("active");
  $("#exercise-picker").value = target;
  $("main").scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll("#exercise-nav button").forEach((button) => button.addEventListener("click", () => selectExercise(button.dataset.target)));
$("#exercise-picker").addEventListener("change", (event) => selectExercise(event.currentTarget.value));

const shapeFields = {
  square: '<label>Cạnh a<input name="side" type="number" min="0" step="any" value="5" required /></label>',
  circle: '<label>Bán kính r<input name="radius" type="number" min="0" step="any" value="5" required /></label>',
  triangle: '<label>Cạnh a<input name="a" type="number" min="0" step="any" value="3" required /></label><label>Cạnh b<input name="b" type="number" min="0" step="any" value="4" required /></label><label>Cạnh c<input name="c" type="number" min="0" step="any" value="5" required /></label>'
};
function renderShapeFields() { $("#shape-inputs").innerHTML = shapeFields[$("#geometry-form").shape.value]; }
renderShapeFields();
$("#geometry-form").shape.addEventListener("change", renderShapeFields);
$("#geometry-form").addEventListener("submit", (event) => {
  event.preventDefault(); const form = event.currentTarget, shape = form.shape.value;
  let area, perimeter, label;
  if (shape === "square") { const a = Number(form.side.value); area = a ** 2; perimeter = 4 * a; label = "hình vuông"; }
  if (shape === "circle") { const r = Number(form.radius.value); area = Math.PI * r ** 2; perimeter = 2 * Math.PI * r; label = "hình tròn"; }
  if (shape === "triangle") { const sides = [Number(form.a.value), Number(form.b.value), Number(form.c.value)].sort((a, b) => a - b); if (sides[0] + sides[1] <= sides[2]) { message("#geometry-result", "<strong>Không tạo được tam giác:</strong> tổng hai cạnh phải lớn hơn cạnh còn lại."); return; } const half = (sides[0] + sides[1] + sides[2]) / 2; area = Math.sqrt(half * (half - sides[0]) * (half - sides[1]) * (half - sides[2])); perimeter = 2 * half; label = "tam giác"; }
  message("#geometry-result", `Kết quả ${label}:\nDiện tích S = <strong>${numberText(area)}</strong>\nChu vi P = <strong>${numberText(perimeter)}</strong>`);
});

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
$("#gcd-form").addEventListener("submit", (event) => { event.preventDefault(); const { a, b } = event.currentTarget; const x = Number(a.value), y = Number(b.value), divisor = gcd(x, y); message("#gcd-result", divisor === 0 ? "Hai số đều bằng 0 nên UCLN và BCNN không xác định." : `UCLN(${x}, ${y}) = <strong>${divisor}</strong>\nBCNN(${x}, ${y}) = <strong>${Math.abs(x * y) / divisor}</strong>`); });

const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i += 1) if (n % i === 0) return false; return true; };
const isPerfect = (n) => { if (n <= 1) return false; let sum = 1; for (let i = 2; i <= Math.sqrt(n); i += 1) if (n % i === 0) { sum += i; if (i * i !== n) sum += n / i; } return sum === n; };
$("#properties-form").addEventListener("submit", (event) => { event.preventDefault(); const n = Number(event.currentTarget.n.value), root = Math.sqrt(n); message("#properties-result", `Số <strong>${n}</strong> ${isPrime(n) ? "là" : "không phải"} số nguyên tố.\nSố <strong>${n}</strong> ${Number.isInteger(root) && n >= 0 ? "là" : "không phải"} số chính phương.\nSố <strong>${n}</strong> ${isPerfect(n) ? "là" : "không phải"} số hoàn hảo.`); });
$("#primes-form").addEventListener("submit", (event) => { event.preventDefault(); const n = Number(event.currentTarget.n.value), values = Array.from({ length: n }, (_, i) => i + 1).filter(isPrime); message("#primes-result", `Có <strong>${values.length}</strong> số nguyên tố từ 1 đến ${n}:\n${values.join(", ") || "(không có)"}`); });
$("#series-form").addEventListener("submit", (event) => { event.preventDefault(); const n = Number(event.currentTarget.n.value); const sum = Array.from({ length: n }, (_, i) => { const value = i + 1; return (value % 2 ? -1 : 1) * value ** value; }).reduce((total, value) => total + value, 0); message("#series-result", `S = −1¹ + 2² − 3³ + … + (−1)ⁿ × nⁿ\nVới n = ${n}, S = <strong>${numberText(sum)}</strong>`); });
$("#equation-form").addEventListener("submit", (event) => { event.preventDefault(); const { a, b, c } = event.currentTarget; const A = Number(a.value), B = Number(b.value), C = Number(c.value), epsilon = 1e-10; const linear = Math.abs(A) < epsilon ? (Math.abs(B) < epsilon ? "vô số nghiệm" : `x = ${numberText(-B / A)}`) : `x = ${numberText(-B / A)}`; const reduced = Math.abs(B) < epsilon ? (Math.abs(C) < epsilon ? "vô số nghiệm" : "vô nghiệm") : `x = ${numberText(-C / B)}`; let quadratic; if (Math.abs(A) < epsilon) quadratic = `suy biến thành phương trình bậc nhất: ${reduced}`; else { const delta = B ** 2 - 4 * A * C; quadratic = delta < -epsilon ? "vô nghiệm thực" : Math.abs(delta) < epsilon ? `nghiệm kép x = ${numberText(-B / (2 * A))}` : `x₁ = ${numberText((-B + Math.sqrt(delta)) / (2 * A))}; x₂ = ${numberText((-B - Math.sqrt(delta)) / (2 * A))}`; } message("#equation-result", `Bậc nhất: ${A}x + ${B} = 0 → <strong>${linear}</strong>\nBậc hai: ${A}x² + ${B}x + ${C} = 0 → <strong>${quadratic}</strong>`); });
function parseNumbers(value) { const parts = value.trim().split(/[\s,;]+/).filter(Boolean); const numbers = parts.map(Number); return parts.length && numbers.every(Number.isInteger) ? numbers : null; }
$("#numbers-form").addEventListener("submit", (event) => { event.preventDefault(); const values = parseNumbers(event.currentTarget.numbers.value); if (!values) { message("#numbers-result", "<strong>Dữ liệu chưa hợp lệ:</strong> hãy chỉ nhập các số nguyên, phân cách bằng dấu phẩy hoặc khoảng trắng."); return; } const positives = values.filter((value) => value > 0); message("#numbers-result", `Mảng ban đầu: <strong>[${values.join(", ")}]</strong>\nSố dương nhỏ nhất: <strong>${positives.length ? Math.min(...positives) : "không có"}</strong>\nSắp xếp giảm dần: <strong>[${[...values].sort((a, b) => b - a).join(", ")}]</strong>\nĐảo thứ tự: <strong>[${[...values].reverse().join(", ")}]</strong>`); });
$("#triangle-form").addEventListener("submit", (event) => { event.preventDefault(); const n = Number(event.currentTarget.n.value); let next = 1, evenTotal = 0, firstTotal = 0, lastTotal = 0; const rows = Array.from({ length: n }, (_, row) => Array.from({ length: row + 1 }, () => { const value = next++; if (value % 2 === 0) evenTotal += value; if (row === 0 || false) firstTotal += 0; return value; })); rows.forEach((row) => { firstTotal += row[0]; }); lastTotal = rows.at(-1).reduce((sum, value) => sum + value, 0); message("#triangle-result", `${rows.map((row) => row.join(" ")).join("\n")}\n\nTổng các số chẵn: ${evenTotal}\nTổng cột đầu tiên: ${firstTotal}\nTổng dòng cuối: ${lastTotal}`); });
$("#string-form").addEventListener("submit", (event) => { event.preventDefault(); const value = event.currentTarget.text.value; message("#string-result", `Chuỗi đảo ngược: <strong>${escapeHtml([...value].reverse().join(""))}</strong>\nChuỗi in hoa: <strong>${escapeHtml(value.toLocaleUpperCase("vi-VN"))}</strong>`); });
$("#strings-form").addEventListener("submit", (event) => { event.preventDefault(); const values = event.currentTarget.strings.value.split(",").map((value) => value.trim()).filter(Boolean); if (!values.length) { message("#strings-result", "<strong>Chưa có chuỗi nào để xử lý.</strong>"); return; } const longest = Math.max(...values.map((value) => [...value].length)), positions = values.map((value, index) => [...value].length === longest ? index + 1 : null).filter(Boolean); message("#strings-result", `Mảng đã sắp xếp: <strong>${values.toSorted((a, b) => a.localeCompare(b, "vi")).map(escapeHtml).join(", ")}</strong>\nChuỗi dài nhất: <strong>${positions.map((position) => escapeHtml(values[position - 1])).join("; ")}</strong>\nVị trí trong mảng ban đầu: <strong>${positions.join(", ")}</strong>`); });
