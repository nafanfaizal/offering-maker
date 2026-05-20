// Discover Pangalengan Offering Letter Generator
let initialPaperHTML='';

document.addEventListener('DOMContentLoaded',()=>{
  initialPaperHTML=document.querySelector('.paper').innerHTML;
});

function loadImg(input,id){
  loadImageInto(input,id);
}
function loadWs(input,id){
  loadImageInto(input,id);
}
function loadPackageImg(input,id){
  loadImageInto(input,id);
}
function loadImageInto(input,id){
  const f=input.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{const el=document.getElementById(id);el.querySelector('img').src=e.target.result;el.classList.add('on');};
  r.readAsDataURL(f);
}
function editableCell(text,extraClass=''){
  const td=document.createElement('td');
  td.contentEditable='true';
  td.spellcheck=false;
  if(extraClass)td.className=extraClass;
  td.textContent=text;
  return td;
}
function actionCell(afterDelete){
  const td=document.createElement('td');
  td.className='no-print';
  const btn=document.createElement('button');
  btn.className='row-del';
  btn.type='button';
  btn.textContent='Hapus';
  btn.onclick=()=>{deleteRow(btn);if(afterDelete)afterDelete();};
  td.appendChild(btn);
  return td;
}
function deleteRow(btn){
  const row=btn.closest('tr');
  if(row)row.remove();
}
function addPriceRow(){
  const tbody=document.querySelector('#tbl-harga tbody');
  const tr=document.createElement('tr');
  tr.append(
    editableCell('Nama Paket Baru'),
    editableCell('Aktivitas / fasilitas yang termasuk'),
    editableCell('1 Hari'),
    editableCell('Min. __'),
    editableCell('Rp ______','hp-cell'),
    actionCell()
  );
  tbody.appendChild(tr);
}
function addServiceRow(){
  const tbody=document.querySelector('#tbl-layanan tbody');
  const tr=document.createElement('tr');
  const status=editableCell('');
  status.innerHTML='<span class="bok">✓ Tersedia</span>';
  tr.append(
    editableCell('Layanan Baru'),
    editableCell('Deskripsi layanan yang ditawarkan'),
    editableCell('Fasilitas termasuk'),
    status,
    actionCell()
  );
  tbody.appendChild(tr);
}
function addTermRow(){
  const tbody=document.querySelector('.ket-tbl tbody');
  const tr=document.createElement('tr');
  const num=document.createElement('td');
  num.className='ket-num';
  const desc=editableCell('');
  desc.innerHTML='<strong>Ketentuan baru</strong> — Isi ketentuan pemesanan di sini.';
  tr.append(num,desc,actionCell(renumberTerms));
  tbody.appendChild(tr);
  renumberTerms();
}
function renumberTerms(){
  document.querySelectorAll('.ket-tbl .ket-num').forEach((cell,index)=>cell.textContent=index+1);
}
function resetAll(){
  if(!initialPaperHTML)return;
  if(confirm('Reset seluruh isi surat, gambar, dan baris tambahan ke format awal?')){
    document.querySelector('.paper').innerHTML=initialPaperHTML;
  }
}
