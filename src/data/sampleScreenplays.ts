export interface SampleScreenplay {
  id: string;
  title: string;
  genre: string;
  style: string;
  pacing: string;
  aspectRatio: '16:9' | '2.39:1' | '9:16';
  description: string;
  content: string;
}

export const SAMPLE_SCREENPLAYS_JA: SampleScreenplay[] = [
  {
    id: 'cyberpunk-tokyo',
    title: 'ネオトーキョー2088・雨の記憶',
    genre: 'サイバーパンク・ネオノワール / SF',
    style: 'ブレードランナー2049調、アナモルフィック35mm、ネオン雨、ボリュメトリックフォグ',
    pacing: '重厚で静謐、張り詰めた緊張感 (Slow-burn)',
    aspectRatio: '2.39:1',
    description: '巨大企業群の影が落ちる2088年の新宿。記憶メモリを巡る私立探偵・レンと情報屋の緊迫した接触。',
    content: `シーン1: 屋外。ネオ新宿・雨の摩天楼街 - 深夜02:45
摩天楼を埋め尽くす巨大なホログラム広告が、雨煙る夜空にサイアンとマゼンタの光芒を投げかけている。
酸性雨に濡れた路面に光が妖しく乱反射する。
私立探偵のレン（42歳、襟を立てた濡れたロングコート、拡張現実アイウェア）が、蒸気立ち込める屋台の軒下で電子タバコに火を点ける。
冷たい青い背景に、ライターの暖かなオレンジ色の炎がレンの頬の傷跡を微かに照らす。
路地の奥から、ずぶ濡れの黒いフードを被った情報屋が震えながら歩み寄ってくる。その胸には、赤い警告ランプが点滅する小型の合金ケースが抱えられている。

シーン2: 屋外。裏路地の非常階段下 - 継続
情報屋の荒い息遣い。
情報屋（変声機越しの掠れた声）:
「レン...奴らが嗅ぎつけた。このチップには、第9層で消された市民たちの生体記憶が全て入っている」
レンが一歩前へ踏み出す。
レン（静かに、威圧感を湛えて）:
「早くそれを渡せ。巡回ドローンの生体スキャナーがこの路地をロックオンする前にな」
突如、夜空を切り裂くような反重力ジェットの爆音が轟き、上空から純白のサーチライトが路地を白日のもとに晒す。二人の影が壁に長く伸びる。`,
  },
  {
    id: 'kyoto-memory',
    title: '黄昏の京都・約束の桜',
    genre: 'シネマティック文芸ドラマ / ノスタルジー愛憎',
    style: '是枝裕和・ウォン・カーウァイ調、50mm単焦点、夕暮れのマジックアワー、淡いフィルム粒子',
    pacing: '詩的、抒情派、切ない余韻 (Poetic & Nostalgic)',
    aspectRatio: '16:9',
    description: '10年ぶりの再会。祇園の古い茶房のテラスで、夕暮れの鴨川を見下ろしながら交わされる二人の未練と告白。',
    content: `シーン1: 屋外。夕暮れの鴨川沿いの小道 - 夕刻
燃えるような茜色の夕陽が、古びた町家の瓦屋根を黄金色に染め上げる。
風が吹き抜け、散り際の桜の花びらが水面を流れていく。
ソウマ（32歳、生成りのジャケット、クラシックカメラを肩に提げている）が石畳の坂道を静かに歩いてくる。
立ち止まり、古い格子戸の喫茶店の2階を見上げる。

シーン2: 屋内。2階テラス席 - 継続
窓から差し込む夕陽が店内の磨かれた木の床に長い影を落とす。
テラスの特等席で、アオイ（30歳、淡い藍色のブラウス、柔らかな横顔）が冷めた抹茶碗を見つめている。
ソウマが階段を上がり、アオイの背後に立つ。
二人の間に、10年という歳月の沈黙が流れる。
アオイが気配に気づき、ゆっくりと振り返る。夕陽が彼女の潤んだ瞳に小さな光の輪を宿す。
アオイ（かすかな微笑み）:
「...遅かったね、ソウマくん」`,
  },
  {
    id: 'shinkansen-thriller',
    title: '深夜特急の追撃者',
    genre: 'サスペンス・アクション / 密室劇',
    style: 'デヴィッド・フィンチャー調、ハイコントラスト、冷徹な色調、85mm浅い被写界深度',
    pacing: '息詰まるハイスピード・サスペンス (Fast-paced)',
    aspectRatio: '2.39:1',
    description: '時速300kmで嵐の夜を疾走する深夜新幹線。暗殺者と公安捜査官が荷物車両で対峙する。',
    content: `シーン1: 屋内。新幹線の連結部デッキ - 嵐の深夜
時速300kmで夜のトンネルを抜ける列車の激しい走行音が車内に響き渡る。
ドアの丸窓の外は土砂降りの雨と激しい雷光。
公安捜査官の神崎（35歳）が銃のセーフティを解除し、スライドを引く。鋭利な金属音が軋む。

シーン2: 屋内。暗い荷物室 - 継続
自動ドアが開き、灰色のトレンチコートを着た女・キリコが現れる。
手には起爆装置の遠隔スイッチが握られている。
時速300kmの遠心力で列車が急カーブに突入し、二人の足元が大きく揺らぐ。
キリコ（冷たい笑み）:
「動かないで。次の鉄橋を渡りきる前に、この列車のすべてが消滅するわ」
神崎の瞳が極限まで収縮する。額を伝う冷や汗。警笛が夜の闇を引き裂く。`,
  },
  {
    id: 'forest-spirits',
    title: 'もののけの森の祈り',
    genre: 'ダークファンタジー / 伝承叙事詩',
    style: 'スタジオジブリ調の実写シネマ、朝霧と木漏れ日、広角マクロ、豊かなエメラルドグリーン',
    pacing: '壮大、神秘的、息をのむ美しさ (Breathtaking)',
    aspectRatio: '2.39:1',
    description: '原生林の奥深く、聖なる湖に現れた太古の守り神と、滅びゆく村の巫女が交わす魂の儀式。',
    content: `シーン1: 屋外。霧深き太古の原生林 - 早朝
木々の間から差し込む光の柱（薄明光線）が、苔むした大岩と清らかな湖面を幻想的に照らし出す。
巫女のシズク（20歳、白装束に勾玉の首飾り）が、水面から突き出た巨木の上に素足で立っている。
彼女が神楽鈴を掲げ、澄んだ音を森中に響かせる。
湖の底から、青く発光する巨大な白鹿の霊獣が静かに波紋を広げながら浮上してくる。`,
  },
];

export const SAMPLE_SCREENPLAYS_VI: SampleScreenplay[] = [
  {
    id: 'cyberpunk-saigon',
    title: 'Hồi Ức Sài Gòn 2088',
    genre: 'Cyberpunk Neo-Noir / Khoa học viễn tưởng',
    style: 'Blade Runner 2049 aesthetic, Anamorphic 35mm, Neon rain, Volumetric smoke',
    pacing: 'Slow-burn, tense & contemplative',
    aspectRatio: '2.39:1',
    description: 'Thám tử tư Minh lần theo dấu vết chip ký ức bị đánh cắp giữa phố đêm Chợ Lớn ngập ánh đèn hologram tím và mưa axit.',
    content: `CẢNH 1: NGOẠI. PHỐ CHỢ LỚN NĂM 2088 - ĐÊM MƯA
Những tòa nhà chọc trời cũ kỹ phủ kín biển quảng cáo hologram 3D nhấp nháy chữ tiếng Việt và tiếng Hoa. Mưa axit rơi lộp độp trên mặt đường loang loáng ánh phản chiếu xanh tím (cyan & magenta).
THÁM TỬ MINH (42 tuổi, áo khoác dài thấm nước, mắt kính thực tế tăng cường phát ánh sáng vàng nhẹ) đứng nép dưới mái hiên của một tiệm mì sủi cảo bốc khói nghi ngút.
Minh châm một điếu thuốc điện tử. Khói thuốc quyện vào màn mưa. Anh liếc nhìn chiếc đồng hồ cơ quang học trên cổ tay: 02:45 sáng.
Một bóng người bí ẩn trùm áo choàng đen (KẺ ĐƯA TIN) bước ra từ con hẻm tối ngập nước, ôm chặt một vali hợp kim nhỏ.

CẢNH 2: NỘI. HẺM SÂU SAU CHỢ - TIẾP TỤC
Kẻ đưa tin dừng lại, hơi thở dồn dập.
KẺ ĐƯA TIN (giọng run rẩy, máy biến âm rè rè):
"Minh... Họ đang tới. Con chip này chứa toàn bộ ký ức của những người đã biến mất ở tầng 9."
Minh bước tới một bước, ánh đèn neon đỏ quét qua gương mặt góc cạnh đầy vết sẹo của anh.
MINH (bình thản, giọng trầm):
"Đưa nó đây. Trước khi radar của đám tuần tra quét trúng hẻm này."
Bất chợt, tiếng gầm rít của động cơ phi thuyền không người lái (Police Drone) xé toạc bầu trời. Ánh đèn pha cực mạnh từ trên cao rọi thẳng xuống, biến bóng của hai người thành những vệt kéo dài trên vách tường rêu phong.`,
  },
  {
    id: 'tay-nguyen-legend',
    title: 'Tiếng Vọng Rừng Sương',
    genre: 'Sử thi / Huyền bí / Tâm lý',
    style: 'Terrence Malick natural lighting, 50mm Prime, Golden hour, Deep atmospheric fog',
    pacing: 'Poetic, breathtaking, emotional',
    aspectRatio: '2.39:1',
    description: 'Bản hùng ca giữa đại ngàn Tây Nguyên hoang sơ, tiếng cồng chiêng ngân vang và cuộc gặp gỡ định mệnh bên bờ vực đá thác nước.',
    content: `CẢNH 1: NGOẠI. THÁC NƯỚC ĐẠI NGÀN TÂY NGUYÊN - RÁNG CHIỀU VÀNG
Ánh nắng hoàng hôn xiên qua tán rừng nguyên sinh rậm rạp, tạo thành những luồng ánh sáng thần tiên (God rays) rọi xuống dòng thác gầm thét dữ dội.
H'LINH (24 tuổi, thiếu nữ dân tộc Ê Đê trong bộ trang phục thổ cẩm thêu hoa văn chỉ bạc) đứng trên mỏm đá nhô ra giữa vực sâu. Gió rừng thổi tung mái tóc đen dài của cô.
Cô nâng chiếc tù và làm bằng sừng bò tót lên môi, thổi một hồi dài vang vọng khắp núi đồi.
Tiếng chim rừng vụt bay tán loạn lên nền trời đỏ rực rỡ như than hồng.

CẢNH 2: NGOẠI. BỜ SUỐI DƯỚI CHÂN THÁC - TIẾP TỤC
Từ trong rừng rậm, Y DHAN (28 tuổi, dũng sĩ mang trên lưng cây cung gỗ lim đen bóng) xuất hiện. Anh dừng lại, bàn chân trần ngập trong làn nước suối mát lạnh.
Y Dhan ngước nhìn lên đỉnh thác, ánh mắt kiên định nhưng đong đầy nỗi khắc khoải.
Y DHAN (nói với thần rừng):
"Thần linh đã nghe thấy tiếng gọi... Mùa trăng này, bóng tối của thú dữ sẽ không thể nuốt chửng buôn làng."
H'Linh từ từ hạ tù và xuống, ánh mắt cô giao nhau với Y Dhan qua màn sương nước trắng xóa bốc lên từ chân thác. Một tiếng chim ưng ré lên giữa không trung bao la.`,
  },
  {
    id: 'train-suspense',
    title: 'Chuyến Tàu Đêm Qua Đèo',
    genre: 'Trinh thám / Hành động nghẹt thở',
    style: 'David Fincher high-contrast, Deep shadows, 85mm Shallow DOF, Cold desaturated tones',
    pacing: 'High-tension, pulse-pounding',
    aspectRatio: '16:9',
    description: 'Trên chuyến tàu Thống Nhất lao vút trong đêm giông bão qua đèo Hải Vân, hai mật vụ ẩn danh đối đầu trong toa hành lý chật hẹp.',
    content: `CẢNH 1: NỘI. TOA HÀNH LÝ TÀU THỐNG NHẤT - ĐÊM GIÔNG
Đoàn tàu sắt rít lên từng hồi trên đường ray trơn trượt quanh co men theo vách đá đèo Hải Vân. Bên ngoài cửa sổ kính mờ sương, những tia chớp chói lòa thỉnh thoảng soi rõ biển đen cuộn sóng bên dưới vực sâu.
Bên trong toa hàng, những kiện gỗ lắc lư theo nhịp tàu chạy. Bóng tối bao trùm, chỉ có ngọn đèn khẩn cấp màu vàng cam chao đảo trên trần tàu.
MẬT VỤ PHONG (35 tuổi, mặc áo da đen) kiểm tra băng đạn súng giảm thanh. Tiếng lách cách lạnh tanh vang lên.

CẢNH 2: NỘI. HÀNH LANG NỐI TOA TÀU - TIẾP TỤC
Cánh cửa trượt kim loại mở ra rít một tiếng kèn kẹt.
BẢO AN (nữ sát thủ cải trang hành khách, áo măng-tô xám, mái tóc ướt sũng) bước vào. Bàn tay giấu trong túi áo đang nắm chặt kíp nổ cảm ứng từ.
Hai người đứng đối diện nhau ở khoảng cách 5 mét, con tàu nghiêng người gắt gao khi vào cua gấp.
BẢO AN (cười lạnh):
"Đừng nhúc nhích, Phong. Cả con tàu này sẽ dừng lại mãi mãi ở khúc cua tiếp theo nếu anh bước thêm một bước."
Phong siết chặt tay cầm súng, đồng tử mắt anh co rút lại. Cận cảnh giọt mồ hôi lạnh chảy dọc sống mũi anh. Tiếng còi tàu gầm rú inh ỏi xé toạc màn đêm.`,
  },
  {
    id: 'hanoi-memory',
    title: 'Hương Cà Phê Mùa Thu Cũ',
    genre: 'Điện ảnh nghệ thuật / Lãng mạn hoài niệm',
    style: 'In The Mood For Love aesthetic, Warm amber tones, 35mm grain, Slow-motion step-printing',
    pacing: 'Tender, nostalgic, bittersweet',
    aspectRatio: '16:9',
    description: 'Một buổi chiều thu Hà Nội lá vàng bay ngập hè phố, quán cà phê Đinh gác hai cũ kỹ chứng kiến sự hội ngộ sau mười năm xa cách.',
    content: `CẢNH 1: NGOẠI. PHỐ CỔ HÀ NỘI - BUỔI CHIỀU THU
Gió heo may thổi nhẹ làm những tán lá sấu vàng bay lượn trên hè phố vôi vàng cổ kính. Tiếng chuông xe đạp lách cách xa xa hòa cùng tiếng rao quen thuộc của người bán xôi cốm.
NAM (32 tuổi, áo len cổ lọ màu be, tay ôm chiếc máy ảnh cơ cũ) bước chầm chậm lên cầu thang gỗ hẹp ọp ẹp dẫn lên quán cà phê tầng 2.
Mỗi bước chân vang lên tiếng cọt kẹt của thời gian.

CẢNH 2: NỘI. QUÁN CÀ PHÊ GÁC HAI - TIẾP TỤC
Căn phòng ngập tràn ánh hoàng hôn vàng ruộm xuyên qua khung cửa chớp xanh đã tróc sơn. Tiếng nhạc Trịnh Công Sơn phát ra từ chiếc máy hát đĩa than rè rè êm dịu.
Ở chiếc bàn cạnh ban công nhìn xuống Hồ Gươm, MAI (30 tuổi, váy trắng thanh nhã, mái tóc buộc lơi) đang ngồi khuấy nhẹ ly cà phê trứng nóng hổi. Khói cà phê thơm ngát bay bảng lảng.
Nam dừng lại ở bậc cửa. Ánh mắt anh chạm vào góc nghiêng gương mặt của Mai.
Mười năm xa cách bỗng thu nhỏ lại trong một khoảnh khắc tĩnh lặng vô tận.
Mai bất chợt quay đầu lại, nhìn thấy Nam. Nụ cười dịu dàng khẽ hé trên môi cô, cùng một giọt nước mắt lấp lánh phản chiếu ánh chiều thu.`,
  },
];

export function getSampleScreenplays(lang: 'ja' | 'vi'): SampleScreenplay[] {
  return lang === 'ja' ? SAMPLE_SCREENPLAYS_JA : SAMPLE_SCREENPLAYS_VI;
}

export const SAMPLE_SCREENPLAYS = SAMPLE_SCREENPLAYS_VI;
