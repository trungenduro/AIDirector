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
    id: 'biet-dau-lai-xai-ja',
    title: '「いつか使うかもしれないだろ！」',
    genre: 'シチュエーション・コメディ / ショートドラマ',
    style: '明るい日中自然光、ハイコントラスト、ハイテンポな編集、コミカルな効果音 (Sitcom)',
    pacing: 'ハイテンポ・スラップスティック (Fast-paced Slapstick)',
    aspectRatio: '9:16',
    description: '道端の物を何でも拾うカイトと災難続きのツッコミ親友ソウタ。TikTok/Shorts向け2〜3分の爆笑ショートコメディ！',
    content: `シーン1：運命の絆創膏
場所：屋外・街路樹のある歩道 – 昼
状況：カイトとソウタが並んで散歩している。ソウタはスマホに夢中、カイトは足元をキョロキョロ見渡している。
カイトが突然立ち止まり、歩道の隅に落ちていた未開封の絆創膏を見つけて目を輝かせる。
カイト（しゃがんで拾い上げ、埃をパパッと払う）:
「おっ！いいもん見っけ！」
ソウタ（立ち止まり、眉をひそめて露骨に嫌そうな顔をする）:
「おいおい、正気かよカイト？道端に落ちてる絆創膏なんて拾うなよ！汚ねえな、そんなの拾ってどうすんだよ？！」
カイト（息を吹きかけて袋をポケットにしまいながら、平然と）:
「ちゃんと袋に入ってるから汚くないだろ。人生何が起きるか分からない…『いつか使うかもしれないだろ！』」
ソウタ（鼻で笑いながら歩き出す）:
「使うわけねえだろ、誰が道端の…」
ソウタが歩きながら大げさに手振りを交えて喋った瞬間、道路脇の鋭いトゲのある植木に手の甲を引っ掛ける。
効果音 (SFX): ピシャッ！/ スパッ！（鋭く切れる音）
ソウタ（飛び跳ねて絶叫し、手を抱え込む）:
「ぎゃああああっ！痛ってえええ！指切れた！血が出てきたカイト、助けてくれぇ！」
カイト（表情一つ変えず、ポケットから絆創膏を取り出して包装を破る）:
「手ぇ出せ」
カイトはソウタの傷口にペタッと完璧な手つきで絆創膏を貼る。
カイト（ソウタの肩をポンポンと叩く）:
「ほらな？言っただろ。『いつか使うかもしれない』ってな」
ソウタは3秒間フリーズし、ぐうの音も出ない表情で固まる。

シーン2：古いペットボトルと降ってきた吸い殻
場所：屋外・ビルの前の歩道 – 続き
状況：二人が歩き続けると、カイトが植え込みの前にしゃがみ、半分水が残った古いペットボトルを拾い上げる。
ソウタ（顔を引きつらせてキレ気味に）:
「またかよ？！お前はゴミ収集業者か！誰かの飲み残しの水なんて拾ってどうすんだよ！人の飲み残しでも飲む気か？！」
カイト（ペットボトルを軽く振りながら不敵な笑み）:
「飲むわけないだろ…言ったはずだぞ、『いつか使うかもしれないだろ！』」
ソウタ（天を仰ぎ、呆れ果てる）:
「頼むから勘弁してくれ！さっきのはただの偶然だ！世の中に二度もそんな都合のいい偶然が…」
その時、頭上の2階ベランダから誰かがポイ捨てしたタバコの吸い殻が落ちてきて、ソウタの頭頂部に直撃する！
効果音 (SFX): ジュウウウ…（髪が焦げる音）
ソウタの頭から煙がモクモクと立ち上り、焦げ臭い匂いが漂う。
ソウタ（鼻をクンクンさせてから異変に気づき絶叫）:
「ん？なんか焦げくさ…熱っ！！熱い熱い熱い！頭が燃えてるぅぅ！火事だあああ！消してくれえええ！」
カイト（極めて冷静にキャップをパチッと開ける）:
「動くな」
効果音 (SFX): バシャアアア！ジュウウウ！
カイトがペットボトルの水をソウタの頭へ豪快にぶちまける。白い煙が立ち上り、ソウタはびしょ濡れの濡れ鼠状態。額にはタバコの灰がべっとり。
カイト（空のペットボトルをゴミ箱にポイと捨てる）:
「な？この水がなかったら、今頃頭ツルツルの坊主頭だったぞ」

シーン3：禁止令と怪しい黒い袋
場所：屋外・交差点の手前 – 続き
状況：ソウタはびしょ濡れの顔を拭きながら、人差し指をカイトの鼻先に突きつけて激怒している。
ソウタ:
「これが最後の警告だぞカイト！今この瞬間から、一切の拾い物を禁止する！次道端のものを拾ったら絶交だからな！分かったな？！」
カイト（素直にコクコクと頷く）:
「了解。もう何も拾わないよ」
十数歩歩いたところで、街路樹の根元に口の縛られた黒いビニール袋が落ちているのを見つける。カイトは足で袋を小突いて中身をチラ見する。手を伸ばそうとするが、ソウタの言葉を思い出して手を引っ込め、立ち去ろうとする。
ソウタ（後ろから怪しんで声を張り上げる）:
「おい！また何か拾おうとしただろ！バレてんだよ！…で、その黒い袋、何が入ってたんだ？」
カイト（至って平然と）:
「お金」
ソウタ（脳の処理が追いつかない）:
「あー…お金ね……はぁぁぁ？！お金ぇぇぇぇ？！」
ソウタの目が飛び出さんばかりに見開き、カイトの胸ぐらを掴んで激しく揺さぶる。
ソウタ:
「お前バカか？！頭沸いてんのかカイト！！金を目の前にしてスルーする奴が地球上のどこにいるんだよ！！今すぐ戻って拾ってこいバカヤロウーーッ！！」

シーン4：束の間の歓喜と突然の大事故
場所：屋外・交差点 – 続き
状況：二人は慌てて引き返し、ソウタが黒い袋を引っ掴んで開ける。中には分厚い1万円札の束がぎっしり。
ソウタ（両目を$マークにして狂喜乱舞、札束を抱きしめる）:
「うおおおお！人生大逆転だぁぁ！カイト、道路渡った先の店で特上寿司奢ってやるよぉぉ！」
興奮のあまり周りが見えなくなったソウタは、袋を抱えたまま左右の確認もせず車道へ飛び出す。
カイト（目を見開いて叫ぶ）:
「ソウタ！車だ、危ないーーっ！」
効果音 (SFX): キキキィィィーーーッ！（急ブレーキ） → ドカーーーン！（衝撃音）
ソウタが宙を舞い、お札が紙吹雪のように舞い散る。
効果音 (SFX): ピーポーピーポー…（救急車のサイレンがフェードイン → 暗転）

シーン5：奇跡のプラマイゼロ
場所：屋外・整形外科病院の玄関前 – 翌日
状況：ソウタはミイラ男のように頭に包帯を巻き、片目は青あざ、鼻にバッテン絆創膏、片腕を三角巾で吊り、ギプスをはめた足で松葉杖をついて現れる。ボロボロの極み。横を歩くカイトの手には真っ赤な領収書。
カイト（申し訳なさそうに小声で尋ねる）:
「なぁソウタ…昨日拾った袋、数えたら結局いくら入ってたんだ？」
ソウタ（腫れ上がった唇から、歯の隙間から絞り出すような声で）:
「ご…50万円だ…」
カイト（手元の領収書を見つめ、素朴な疑問を口にする）:
「あれ…？さっきの入院費と手術費、全部でいくら払ったっけ？」
ソウタ（顔をぐしゃぐしゃにして涙をボロボロこぼす）:
「……きっちり50万円だよ！！ジュース1本すら買えねえよチクショー！！」
カイト（目を輝かせ、パチンと手を打つ）:
「ほら見ろ！言っただろ！『いつか使うかもしれないだろ！』あの50万拾ってなかったら、今の治療費どうやって払うつもりだったんだよ？お前マジで運がいいな！」
ソウタ（怒りで血圧マックス、松葉杖を天に掲げて絶叫）:
「ふざけんじゃねえええええ！！もう二度と何も拾うな！頼むから何も拾わないでくれ！たとえ金でも絶対に拾うんじゃねえぞオオオオ！！」
ソウタが怒り狂って松葉杖でカイトを追いかけようとするが、足元にあったバナナの皮に滑って豪快に転倒する。
効果音 (SFX): ドテッ！（鈍い転倒音）
エンディング曲: おなじみの海外ミーム曲 (Directed by Robert B. Weide) が流れてフェードアウト。
— 幕 —`,
  },
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
    id: 'biet-dau-lai-xai-vi',
    title: 'Biết Đâu Lại Xài! (いつか使うかもしれないだろ！)',
    genre: 'Hài tình huống / Phim ngắn TikTok & Reels',
    style: 'Ánh sáng ban ngày rực rỡ, độ tương phản cao, nhịp dựng sitcom nhanh, hiệu ứng âm thanh hài hước',
    pacing: 'Nhanh & Hài hước bùng nổ (Fast-paced Slapstick)',
    aspectRatio: '9:16',
    description: 'Phim ngắn hài 2-3 phút chuẩn TikTok/Reels: Thói quen nhặt đồ vỉa hè của Phong và chuỗi tai nạn cười ra nước mắt của anh bạn thân Huy.',
    content: `CẢNH 1: NGOẠI. VỈA HÈ PHỐ CÂY XANH - BAN NGÀY
Phong và Huy đang đi dạo bên nhau. Huy chăm chú cắm mặt vào điện thoại, còn Phong thì mắt đảo lia lịa xuống vỉa hè.
Phong đột ngột dừng lại, mắt sáng rực khi phát hiện một miếng băng cá nhân còn nguyên trong bọc nilon rơi ở mép đường.
Phong (ngồi xổm nhặt lên, phủi nhẹ bụi):
"Ủa ngon! Nhặt được hàng ngon rồi nè!"
Huy (dừng bước, cau mày nhăn mặt chê bai):
"Mày bị ấm đầu hả Phong? Băng cá nhân người ta làm rơi ngoài đường cũng nhặt! Dơ dáy muốn chết, nhặt cái đó làm gì?!"
Phong (thổi nhẹ vào bọc rồi thản nhiên nhét vào túi):
"Còn nguyên bao bì sạch bong thế này dơ gì. Cuộc đời ai biết trước ngày mai... 'Biết đâu lại xài'!"
Huy (cười khẩy khinh bỉ rồi sải bước tiếp):
"Xài cái đầu mày, có ma nó mới xài đồ vỉa..."
Vừa nói dứt câu, Huy vung tay chém gió trúng ngay nhánh cây có gai nhọn hoắt bên lề đường.
Hiệu ứng âm thanh (SFX): Xoẹt! (Tiếng rách da sắc lẹm)
Huy (nhảy cẫng lên ôm lấy ngón tay la toáng):
"Á á á! Chảy máu rồi! Rách tay rồi Phong ơi, cứu tao với đau quá!"
Phong (mặt không biến sắc, rút miếng băng trong túi ra xé bao):
"Đưa tay đây."
Phong dán miếng băng cái "bẹp" cực kỳ chuẩn xác và điệu nghệ lên vết thương của Huy.
Phong (vỗ vai Huy bôm bốp):
"Đấy, thấy chưa? Đã bảo rồi mà. 'Biết đâu lại xài'!"
Huy đứng đực mặt ra 3 giây, câm nín không cãi lại được câu nào.

CẢNH 2: NGOẠI. VỈA HÈ TRƯỚC TÒA NHÀ CAO TẦNG - TIẾP TỤC
Hai người đi tiếp một đoạn. Phong lại cúi xuống bụi cây ven đường, nhặt lên một chai nước suối cũ còn nửa chai nước.
Huy (mặt méo mó gắt gỏng):
"Lại nữa hả trời?! Mày tính chuyển nghề làm công nhân môi trường luôn đấy à? Nhặt chai nước thừa của ai vứt làm gì, định uống nước thừa người ta à?!"
Phong (lắc lắc chai nước, cười bí hiểm):
"Uống thế nào được... Đã bảo rồi, 'Biết đâu lại xài'!"
Huy (ngửa mặt than trời ngán ngẩm):
"Tao lạy mày! Vừa nãy chỉ là ăn may thôi! Trên đời làm gì có chuyện trùng hợp lần thứ hai..."
Đúng lúc đó, từ ban công tầng 2 tòa nhà phía trên, một ai đó gạt tàn thuốc lá đang cháy dở rơi thẳng trúng đỉnh đầu Huy!
Hiệu ứng âm thanh (SFX): Xèo xèo xèo... (Tiếng tóc cháy khét lẹt)
Hình ảnh: Khói bốc lên ngùn ngụt trên đầu Huy, mùi khét bốc lên nồng nặc.
Huy (khịt khịt mũi rồi nhảy dựng lên hoảng loạn):
"Ủa mùi gì khét khét... Á nóng quá! Nóng nóng rát đầu tao rồi! Cháy tóc rồi cứu hỏa mau lên Phong ơi!"
Phong (cực kỳ điềm tĩnh vặn nắp chai nước cái 'tách'):
"Đứng im."
Hiệu ứng âm thanh (SFX): Àoooo! Xèo xèo...!
Phong hất cả chai nước dội thẳng lên đỉnh đầu Huy. Khói trắng bốc lên mù mịt, Huy ướt sũng như chuột lột, tàn tro đen dính đầy trán.
Phong (ném vỏ chai vào thùng rác bên đường):
"Thấy chưa? Không có nửa chai nước này thì giờ mày thành hòa thượng cạo đầu luôn rồi đấy."

CẢNH 3: NGOẠI. TRƯỚC NGÃ TƯ ĐƯỜNG - TIẾP TỤC
Huy vừa vuốt nước tèm lem trên mặt vừa dí thẳng ngón tay vào mũi Phong nổi điên:
Huy:
"Đây là cảnh cáo cuối cùng của tao nghe chưa Phong! Từ giây phút này trở đi cấm tiệt mày nhặt bất cứ thứ gì! Nhặt thêm một món nữa là tuyệt giao bạn bè! Rõ chưa?!"
Phong (ngoan ngoãn gật đầu lia lịa):
"Rõ rồi. Tao không nhặt gì nữa đâu."
Đi được thêm chục bước, dưới gốc cây bàng có một túi nilon màu đen được cột chặt miệng. Phong lấy mũi giày khẽ hích vào túi, liếc nhìn qua khe hở. Phong toan thò tay xuống định nhặt nhưng nhớ lời cảnh cáo của Huy nên rụt tay lại, quay lưng bước đi.
Huy (đi sau thấy nghi ngờ liền lớn tiếng):
"Này! Lại tính nhặt cái gì đấy hả? Đừng hòng qua mắt tao! ...Thế trong cái túi đen đó có cái gì?!"
Phong (vô cùng bình thản):
"Tiền."
Huy (não bộ chưa kịp xử lý):
"À... tiền hả...... HẢ?! TIỀN Á?!!"
Mắt Huy trợn tròn như muốn rớt ra ngoài, lao tới nắm chặt cổ áo Phong lắc điên cuồng.
Huy:
"Mày bị ngáo ngơ hả Phong?! Não mày chứa cái gì vậy hả?! Thấy cả túi tiền trước mặt mà lướt qua như người vô hình?! Quay lại nhặt ngay cho tao thằng điên nàyyyy!"

CẢNH 4: NGOẠI. NGÃ TƯ ĐƯỜNG - TIẾP TỤC
Cả hai hớt hải chạy ngược lại. Huy vồ lấy túi nilon đen giật tung ra. Bên trong là từng cọc tiền 500 nghìn đồng dày cộp xếp chật ních.
Huy (hai mắt biến thành hình dấu đô la, nhảy múa điên loạn, ôm chặt cọc tiền vào lòng):
"Trời ơi đổi đời rồiii! Phong ơi, qua bên kia đường tao bao mày một bữa buffet bò Kobe ngập mặt luôn haha!"
Quá hưng phấn đến mức mất hết lý trí, Huy ôm túi tiền lao phăng qua đường mà không thèm nhìn ngó xe cộ.
Phong (trợn tròn mắt hét thất thanh):
"Huy! Ô tô kìa, coi chừnggggg!"
Hiệu ứng âm thanh (SFX): Kéééttt! (Tiếng phanh gấp) → RẦM! (Tiếng va chạm cực lớn)
Hình ảnh: Huy bay bổng lên trời, những tờ tiền bung ra bay lả tả như pháo hoa mừng năm mới.
Hiệu ứng âm thanh (SFX): Tiếng còi xe cấp cứu inh ỏi ré lên → Màn hình tối sầm.

CẢNH 5: NGOẠI. CỔNG BỆNH VIỆN CHẤN THƯƠNG CHỈNH HÌNH - NGÀY HÔM SAU
Huy xuất hiện trông không khác gì xác ướp Ai Cập: đầu quấn băng trắng kín mít, một bên mắt tím bầm, mũi dán băng chéo, một cánh tay bó bột treo trước ngực, chân bó thạch cao chống nạng khập khiễng. Phong đi bên cạnh, cầm trên tay tờ hóa đơn viện phí đỏ chót.
Phong (nhẹ giọng rụt rè hỏi):
"Này Huy... cái túi tiền hôm qua nhặt được, đếm lại cuối cùng được bao nhiêu thế?"
Huy (môi sưng vều, rên rỉ qua kẽ răng):
"Năm... năm mươi triệu..."
Phong (nhìn kỹ vào hóa đơn đỏ, ngây thơ thắc mắc):
"Ủa... thế tổng tiền viện phí với phẫu thuật hồi nãy vừa thanh toán hết bao nhiêu ấy nhỉ?"
Huy (mặt méo xệch, nước mắt giàn giụa):
"Đúng... đúng năm mươi triệu tròn trịa!! Không dư nổi một nghìn mua gói tăm cay hu hu hu!!"
Phong (mắt sáng rực, vỗ đùi đánh đét):
"Thấy chưa?! Đã bảo rồi mà! 'Biết đâu lại xài!' Không có năm mươi triệu đó nhặt được thì lấy tiền đâu trả viện phí hả? Mày đúng là số đỏ nhất quả đất đấy!"
Huy (tăng xông huyết áp, vung nạng chỉ lên trời gào thét):
"May cái đầu mày ấyyyy! Từ giờ trở đi cấm mày nhặt bất cứ thứ gì nữa! Tao lạy mày đừng nhặt gì hết! Kể cả có là núi tiền cũng cấm tuyệt đối không được nhặt cho taoooo!!"
Huy nổi điên chống nạng tính đuổi đánh Phong nhưng đạp trúng vỏ chuối ven đường ngã cái rầm.
Hiệu ứng âm thanh (SFX): Ầm! Rầm!
Nhạc kết thúc: Giai điệu meme huyền thoại (Directed by Robert B. Weide) vang lên rộn rã.
— HẾT —`,
  },
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
