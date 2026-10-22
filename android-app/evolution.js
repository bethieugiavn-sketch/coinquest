export const FORMS = Object.freeze([
  [1,'Mầm non dũng cảm','🌱'],[3,'Chồi lá tinh nghịch','🌿'],[5,'Bạn nhỏ đom đóm','✨'],[8,'Hộ vệ rừng xanh','🍃'],
  [12,'Nấm lộc du hành','🍄'],[18,'Hiệp sĩ hoa mai','🌼'],[25,'Tinh linh hồ ngọc','💧'],[35,'Sứ giả san hô','🪸'],
  [45,'Rồng nước tí hon','🐉'],[60,'Kỵ sĩ thủy triều','🔱'],[80,'Mầm pha lê','💎'],[100,'Vệ binh thạch anh','🔮'],
  [125,'Pháp sư cực quang','🪄'],[150,'Phượng hoàng băng','❄️'],[180,'Lữ khách mây hồng','☁️'],[215,'Tiên lộc cầu vồng','🌈'],
  [255,'Kỳ lân bình minh','🦄'],[300,'Vương miện mặt trời','☀️'],[350,'Người giữ trăng','🌙'],[400,'Rồng sao phương Bắc','⭐'],
  [460,'Hộ thần thiên hà','🌌'],[530,'Cổ thụ ngân hà','🌳'],[610,'Long thần hoàng kim','🐲'],[700,'Tinh linh vĩnh cửu','👑'],
].map(([level,name,icon])=>Object.freeze({level,name,icon})));
export const WORLDS = ['Rừng ban mai','Thung lũng hoa','Hồ ngọc lam','Hang pha lê','Đảo trên mây','Ngân hà tài lộc'];
export const STYLES = Object.freeze([
  {id:'wood',name:'Mộc Linh',icon:'🌳',unlock:1,color:'#b6d878',gear:['Áo vỏ cây','Trượng mầm xanh','Hộ giáp cổ thụ','Vương miện rừng già']},
  {id:'knight',name:'Hiệp Sĩ',icon:'🛡️',unlock:3,color:'#c2d1d7',gear:['Giáp tập sự','Kiếm lá & khiên đồng','Giáp bạc hộ vệ','Thánh giáp hoàng kim']},
  {id:'mage',name:'Pháp Sư',icon:'🪄',unlock:8,color:'#bc9bdf',gear:['Áo choàng tím','Trượng thạch anh','Pháp ấn tinh tú','Đại pháp sư ngân hà']},
  {id:'dragon',name:'Long Thần',icon:'🐉',unlock:18,color:'#83cbb6',gear:['Sừng ngọc non','Cánh rồng thức tỉnh','Vảy vàng thủ hộ','Long thần thiên giới']},
  {id:'mecha',name:'Cơ Giáp',icon:'🤖',unlock:35,color:'#a8c8cd',gear:['Bộ giáp cơ bản','Lõi năng lượng lam','Giáp phản lực','Cơ giáp tinh vân']},
]);
export const GEAR_LEVELS = Object.freeze([1,5,25,100]);
export function gearAt(level){let grade=0;while(grade<3&&level>=GEAR_LEVELS[grade+1])grade++;return grade;}
export function styleAt(id,level=1){const found=STYLES.find(s=>s.id===id);return found&&level>=found.unlock?found:STYLES[0];}
export function evolutionAt(level) {
  const safe = Math.max(1, Number.isFinite(level) ? Math.floor(level) : 1);
  let tier = 0;
  while (tier + 1 < FORMS.length && safe >= FORMS[tier+1].level) tier++;
  const stars = safe >= 700 ? Math.floor((safe-700)/100) : 0;
  const next = tier < FORMS.length-1 ? FORMS[tier+1].level : 700+(stars+1)*100;
  const start = tier < FORMS.length-1 ? FORMS[tier].level : 700+stars*100;
  const world = tier < 20 ? Math.floor(tier/4) : 5;
  return {tier,level:safe,stars,next,start,world,name:FORMS[tier].name,icon:FORMS[tier].icon,progress:Math.min(100,(safe-start)/(next-start)*100)};
}
