export default function formatText(text:string):string {
  return text.replace(/\.\s/g, ".<br><br>");
}