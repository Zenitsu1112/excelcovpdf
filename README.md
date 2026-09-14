# 📄 Portal Document & Media to PDF Suite

![Zero Backend](https://img.shields.io/badge/Backend-Zero_Server-success?style=for-the-badge)
![Client-Side](https://img.shields.io/badge/Execution-100%25_Browser_Sandbox-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

A lightweight, zero-dependency, 100% client-side web utility suite designed to convert portal spreadsheet exports (`.xlsx`) and images (`.jpg`, `.jpeg`, `.png`, `.webp`) into clean, print-ready documents and optimized payloads.

Built specifically to handle the raw XML `NaN` parsing bugs found in government and educational web portal exports (such as **e-Vidyavahini**, **HRMS**, and state administrative reports) that crash standard tools.

---

## 📸 Preview

<p align="center">
  <img src="assets/image.png" alt="Portal Document & Media to PDF Suite Preview" width="800" style="border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.5);" />
</p>

---

## 🚀 Live Demo

Deployable on **GitHub Pages** with zero build configuration.  
👉 **[Launch Web Workspace](https://zenitsu1112.github.io/excelcovpdf/)**

---

## 🛠️ How It Solves the Portal `NaN` Bug

Portal data exporters (e.g., e-Vidyavahini, HRMS) frequently serialize missing serial numbers, empty dates, or undefined numeric formulas directly into spreadsheet XML as raw `NaN` strings:

```xml
<!-- Corrupted Portal XML Output inside xl/worksheets/sheet1.xml -->
<row r="2">
    <c r="A2"><v>NaN</v></c>
    <c r="B2" t="s"><v>0</v></c>
    <c r="G2"><v>NaN</v></c>
    <c r="J2" t="s"><v>1</v></c>
</row>
