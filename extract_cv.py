from pypdf import PdfReader

reader = PdfReader("Alaa Asaad_CV.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n\n"

with open("cv_text_clean.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("Text extracted to cv_text_clean.txt")
