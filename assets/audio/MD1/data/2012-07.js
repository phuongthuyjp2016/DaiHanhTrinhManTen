window.MONDAI1_DATA = window.MONDAI1_DATA || {};
window.MONDAI1_DATA['2012-07'] = {
  examLabel: '2012-07',
  audioSrc: 'assets/audio/MD1/N1_7-2012.mp3',
  questions: [
  {
    number: 1,
    question: '病院で女の人は患者の男の人に薬について説明しています。男の人は今日の夜どの薬を塗らなければなりませんか。',
    image: 'assets/audio/MD1/N1_Choukai_2012-07_Mondai1_1番.png',
    choices: ['黒い容器の薬と白い容器の薬','黒い容器の薬','黒い容器の薬と小さい容器の薬','白い容器の薬'],
    correctAnswer: 3,
    script: [
      { speaker:'女', spk:'f', text:'今日、お出しするお薬、こちらになります。' },
      { speaker:'男', spk:'m', text:'はい。' },
      { speaker:'女', spk:'f', text:'ちょっと多いので、ご説明しますね。えーと、痒いうちは朝と夜、この黒い容器の薬を塗ってから、白い方の薬を塗ってください。ただ今日はもうこの黒いのは塗ってありますので、今日の夜は塗らないで結構です。' },
      { speaker:'男', spk:'m', text:'はい。' },
      { speaker:'女', spk:'f', text:'それで、2、3日して、かゆくなくなったら、白いのをやめて、この小さい容器の薬に切り替えてください。' },
      { speaker:'男', spk:'m', text:'黒いのは続けるんですね。' },
      { speaker:'女', spk:'f', text:'はい、二週間はやめないでください。' }
    ],
    explanation: 'Đây là dạng câu hỏi cần lọc 3 loại thuốc theo 3 mốc thời gian khác nhau — bẫy nằm ở việc nhầm lẫn "quy trình chung" với việc phải làm riêng tối nay. Quy trình chung khi còn ngứa là bôi đen rồi bôi trắng (cả sáng và tối), nhưng có ngoại lệ CHO HÔM NAY: 「今日はもうこの黒いのは塗ってありますので、今日の夜は塗らないで結構です」 (đen hôm nay đã bôi rồi → tối nay không cần bôi đen nữa) → loại hũ đen khỏi câu trả lời tối nay. Hũ nhỏ chỉ dùng sau khi hết ngứa 2-3 ngày (「2、3日して、かゆくなくなったら…この小さい容器の薬に切り替えてください」) — hiện tại chưa đến lúc đó → loại hũ nhỏ. Vậy tối nay chỉ còn lại hũ trắng cần bôi. Bẫy phụ 「黒いのは続けるんですね」「二週間はやめないでください」 chỉ xác nhận đen vẫn phải dùng các ngày sau (trong 2 tuần), không liên quan đến câu hỏi tối NAY.',
    keypoint: 'Đây là dạng câu hỏi cần lọc 3 loại thuốc theo 3 mốc thời gian khác nhau — bẫy nằm ở việc nhầm lẫn "quy trình chung" với việc phải làm riêng tối nay.'
  },
  {
    number: 2,
    question: '男の学生と女の学生が話しています。男の学生はこの後どんな準備をしなければなりませんか。',
    choices: ['事前に団体に登録する','川の生物について調べる','ぬれてもいい靴を用意する','ごみ袋と手袋を用意する'],
    correctAnswer: 2,
    script: [
      { speaker:'男', spk:'m', text:'ねー、環境保護ボランティアのサークルに入ってるんだって。僕も何回やってみたいと思ってるんだけど、どんなことやってんの。' },
      { speaker:'女', spk:'f', text:'うん、いろいろ。あー、来週の日曜日、川の清掃活動があるから。来てみる。' },
      { speaker:'男', spk:'m', text:'うん、行く行く。でも、いきなり行っていいの？事前に登録するとか、読んでおく資料とかないの？' },
      { speaker:'女', spk:'f', text:'うーん。特に何も。当日集まったら、まずみんなでその川の生物について、簡単に説明を聞くの。で、その後、実際に川に入って、観察しながら、ゴミとか、空き缶とか拾うんだ。だから濡れてもいい靴で行った方がいいよ。' },
      { speaker:'男', spk:'m', text:'じゃ、長靴かなんか買わなくちゃ。後、掃除するんだったら、ゴミ袋とか手袋も持っていたほうがいいよね。' },
      { speaker:'女', spk:'f', text:'あ、そういうのはサークルのほうで用意するから、大丈夫だよ。' },
      { speaker:'男', spk:'m', text:'そうなんだ。どんな感じなんだろう。楽しみだな。' }
    ],
    explanation: 'Nam hỏi "事前に登録するとか…ないの?" (có cần đăng ký trước không?) → nữ trả lời thẳng "特に何も" (không cần gì cả) → loại đáp án 1. Việc tìm hiểu sinh vật sông ("川の生物について…説明を聞くの") diễn ra **tại chỗ, do người khác giảng**, không phải nam tự tra cứu trước → loại đáp án 2. Nữ nói rõ cần chuẩn bị: "濡れてもいい靴で行った方がいいよ" (nên đi giày có thể bị ướt) → đáp án 3, đúng cấu trúc gợi ý "~た方がいいよ" điển hình của việc cần chuẩn bị. Nam đề xuất thêm túi rác/găng tay nhưng bị từ chối ngay: "そういうのはサークルのほうで用意するから、大丈夫だよ" (câu lạc bộ đã chuẩn bị sẵn) → loại đáp án 4.',
    keypoint: 'Nam hỏi "事前に登録するとか…ないの?" (có cần đăng ký trước không?) → nữ trả lời thẳng "特に何も" (không cần gì cả) → loại đáp án 1.'
  },
  {
    number: 3,
    question: '会社で男の人と女の人が話しています。女の人は翻訳のどの部分を直さなければなりませんか。',
    choices: ['世界経済の動向','市場分析','政府の政策','今後の株価の動き'],
    correctAnswer: 2,
    script: [
      { speaker:'男', spk:'m', text:'この間やってもらった経済記事の翻訳のことだけどね。' },
      { speaker:'女', spk:'f', text:'はい。' },
      { speaker:'男', spk:'m', text:'全体的にろくできてるよ。世界経済の動向っていう見出しもいいし、最初の分析の部分もとても読みやすいね。' },
      { speaker:'女', spk:'f', text:'ありがとうございます。' },
      { speaker:'男', spk:'m', text:'問題は政府の景気の所かな。気になったところに下線を引いておいたから、もう一度やってみてくれるかな。' },
      { speaker:'女', spk:'f', text:'はい、わかりました。' },
      { speaker:'男', spk:'m', text:'株価の予想のところは田中君にみてもらった?' },
      { speaker:'女', spk:'f', text:'はい。コメントいただいて、すでに修正してあります。' }
    ],
    explanation: 'Dạng Review đúng chuẩn: khen trước, でも/問題は mới là ý thật. Đoạn đầu khen: "見出しもいいし、最初の分析の部分もとても読みやすい" → đáp án 1 (世界経済の動向, tiêu đề) và đáp án 2 (市場分析, phần phân tích đầu) đều ĐÃ ĐƯỢC KHEN TỐT → loại cả hai. Câu chuyển ý "**問題は**政府の景気の所かな" (vấn đề là ở phần chính sách/tình hình kinh tế chính phủ) — từ khóa "問題は" đóng vai trò như でも, báo hiệu góp ý thật → đáp án 3. Đáp án 4 (株価の予想 = phần dự đoán giá cổ phiếu) đã được xử lý xong: "コメントいただいて、**すでに修正してあります**" (đã sửa xong rồi) → loại theo quy tắc "~てある = đã làm".',
    keypoint: 'Dạng Review đúng chuẩn: khen trước, でも/問題は mới là ý thật.'
  },
  {
    number: 4,
    question: '会社で男の人と女の人が話しています。男の人は開発中の商品をどうしますか。',
    choices: ['容器の色を変える','味付けに変化をもたせる','おかずの種類を減らす','容器の形状を変える'],
    correctAnswer: 3,
    script: [
      { speaker:'男', spk:'m', text:'部長、今度の春に発売するお弁当の試作品ができたんですが、ご意見をいただけますか？' },
      { speaker:'女', spk:'f', text:'うーん、見た目はカラフルで食欲をそそるわね。容器の色もなかなかいいじゃない。' },
      { speaker:'男', spk:'m', text:'はい、今回のターゲットは女性ということで、彩りを重視しました。' },
      { speaker:'女', spk:'f', text:'確かに、野菜が豊富で女性受けしそうね。それぞれ一口サイズで女性向きだと思うわ。' },
      { speaker:'男', spk:'m', text:'うちの女性社員にアンケートを取ったところ、少しずついろんな種類のものを食べたという声が多かったので、品数を増やしました。' },
      { speaker:'女', spk:'f', text:'うん、味付けにも変化があって、飽きが来ないわね。ただ、品数の分だけ、入れ物が大きくなってるのね。あんまり大きいともちにくくない？' },
      { speaker:'男', spk:'m', text:'そうですか。じゃ、少しおかずの数を減らしたほうがいいでしょうか？' },
      { speaker:'女', spk:'f', text:'うーん、そこはセールスポイントの一つだからね。味のバランスも変わるし。むしろ、外側を変えられない？例えば、箱を二段にして、ご飯を下の段に入れちゃうとかね。' },
      { speaker:'男', spk:'m', text:'なるほど。そうすれば、おかずはこのまま全部見せられますね。わかりました。早速検討してみます。' }
    ],
    explanation: 'Ba lời khen đầu đều bị loại vì đã tốt/đã làm xong: "容器の色もなかなかいい" → loại đáp án 1; "味付けにも変化があって、飽きが来ない" → loại đáp án 2. Vấn đề thật xuất hiện sau ただ: "ただ、品数の分だけ、入れ物が大きくなってる…あんまり大きいともちにくくない?" (hộp to quá, khó cầm). Nam đề xuất hướng giải quyết SAI: "少しおかずの数を減らしたほうがいいでしょうか?" nhưng bị bác ngay bằng むしろ (thay vào đó): "そこはセールスポイントの一つ…むしろ、外側を変えられない?" → đáp án 3 (giảm số món) bị từ chối trực tiếp → loại. Đề xuất thay thế cuối cùng — cũng là đề xuất được cả hai đồng thuận ("なるほど…早速検討してみます") — là đổi hình dạng bên ngoài hộp (箱を二段にして) → đáp án 4.',
    keypoint: 'Ba lời khen đầu đều bị loại vì đã tốt/đã làm xong: "容器の色もなかなかいい" → loại đáp án 1; "味付けにも変化があって、飽きが来ない" → loại đáp án 2.'
  },
  {
    number: 5,
    question: '会社で女の人と男の人が話しています。女の人はこの後すぐ何をしますか。',
    choices: ['資料を作り直す','資料の訂正一覧表を作る','資料を処分する','資料を会場に運ぶ'],
    correctAnswer: 1,
    script: [
      { speaker:'女', spk:'f', text:'部長、プレゼンで使う資料のコピーができました。会場に運んでおきましょうか。' },
      { speaker:'男', spk:'m', text:'あ、それなんだけど、実は今、いくつか間違いを見つけてね、訂正が必要になったんだ。せっかく作ってくれたのに、申し訳ないんだけど、つくりなおしてもらえるかな。' },
      { speaker:'女', spk:'f', text:'えっ？そうなんですか。わかりました。訂正するのはどんな部分でしょうか。' },
      { speaker:'男', spk:'m', text:'赤ペンで書いたところ。うん、ちょっと待って、訂正するページがたくさんあるから。今から、資料を作り直して人数分コピーするじゃ、間に合わないかもしれないな。' },
      { speaker:'女', spk:'f', text:'そうですね。ちょっと厳しいかもしれません。' },
      { speaker:'男', spk:'m', text:'じゃ、訂正が必要な部分をリストにして一枚の紙にまとめて配ろうか。それならコピーも一枚ずつで済むから、時間に間に合うだろう。' },
      { speaker:'女', spk:'f', text:'はい、それでしたら、なんとかなると思います。' },
      { speaker:'男', spk:'m', text:'ちょっと見栄えは良くないけど、いまある資料も処分しなくて済むしな。よし、そうしよう。僕は先に行って会場の準備をしておくから、悪いけど、資料の方はお願い出来るかな？' },
      { speaker:'女', spk:'f', text:'はい、では、至急取り掛かります。' }
    ],
    explanation: 'Đây là dạng đề xuất ban đầu bị **thay đổi giữa chừng** — bẫy lớn nhất trong câu này. Đề xuất ĐẦU TIÊN của sếp là "つくりなおしてもらえるかな" (làm lại tài liệu → nghe giống đáp án 1), NHƯNG chính sếp tự nhận ra không kịp giờ: "資料を作り直して人数分コピーするじゃ、**間に合わないかもしれない**" → nữ xác nhận "厳しいかもしれません" → đề xuất 1 bị hủy → loại đáp án 1. Đề xuất THAY THẾ, chốt cuối cùng: "訂正が必要な部分を**リストにして**一枚の紙にまとめて配ろうか" → đáp án 2, được nữ đồng ý rõ ràng ("それでしたら、なんとかなると思います") và xác nhận hành động ngay ở câu cuối: "至急取り掛かります". Đáp án 3 (hủy tài liệu) bị loại trực tiếp: "いまある資料も**処分しなくて済む**" (không cần hủy). Đáp án 4 (mang đến hội trường) là đề xuất ban đầu của NỮ ở đầu bài nhưng bị chặn lại vì phát hiện lỗi cần sửa trước, và cuối cùng người ĐI hội trường là nam ("僕は先に行って会場の準備をしておく"), không phải nữ → loại.',
    keypoint: 'Đây là dạng đề xuất ban đầu bị **thay đổi giữa chừng** — bẫy lớn nhất trong câu này.'
  },
  {
    number: 6,
    question: '先生と学生が卒業論文の目次を見ながら話しています。学生は論文のどの部分を書き直さなければなりませんか。',
    choices: ['1章 研究の背景','2章 研究の目的','4章 研究の分析結果','5章 もとめ（結論）'],
    correctAnswer: 0,
    script: [
      { speaker:'女', spk:'f', text:'論文、読みましたよ。' },
      { speaker:'男', spk:'m', text:'ありがとうございます。あの、どうでしょう。五章がちょっと気になるんですけど。' },
      { speaker:'女', spk:'f', text:'大体いいんだけど。五章のまとめにもう少し自分の意見をかいたほうがよかったかな。本当にまとめて大事だから。もう少し丁寧に書かないといけないんだけど。今回はもう時間がないから、まあ、いいでしょう。' },
      { speaker:'男', spk:'m', text:'はい。' },
      { speaker:'女', spk:'f', text:'あと、1章の研究の背景だけど、これまでの研究について、ただ並べてあるだけで、読みやすいとは決していえないですよ。' },
      { speaker:'男', spk:'m', text:'あ、はい。すみません。' },
      { speaker:'女', spk:'f', text:'2章の研究目的につながるようにそのあたりをわかりやすくかかないと。ここはちょっと手を入れたほうがいいと思います。あと一週間あるから。' },
      { speaker:'男', spk:'m', text:'わかりました。' },
      { speaker:'女', spk:'f', text:'それなら、分析結果は本当は項目ごとにもう少し深く分析するとよかったんだけど、まあ、これは今後の課題ということにしましょう。' },
      { speaker:'男', spk:'m', text:'はい、わかりました。では、ご指摘いただいたところをかきなおして、来週持ってきます。' }
    ],
    explanation: 'Bài này có TỚI 3 chương bị nhận xét, nên bẫy chính là phân biệt "có vấn đề nhưng **bỏ qua**" với "có vấn đề và **phải sửa ngay**". Chương 5 (もとめ/kết luận) nam tự hỏi trước, cô giáo thừa nhận có vấn đề nhưng chốt: "今回はもう**時間がないから**、まあ、**いいでしょう**" (hết thời gian rồi, thôi bỏ qua) → loại đáp án 4. Chương 4 (研究の分析結果) cũng bị nhận xét chưa sâu nhưng được hoãn: "まあ、これは**今後の課題**ということにしましょう" (coi như bài tập về sau) → loại đáp án 3. Chỉ có chương 1 (研究の背景) hội đủ 2 điều kiện của việc PHẢI SỬA: (1) lời phê rõ ràng, không giảm nhẹ — "読みやすいとは**決していえない**ですよ" / "ここはちょっと**手を入れたほうがいい**と思います", và (2) còn đủ thời gian để sửa — "**あと一週間あるから**" → đáp án 1. Câu chốt của nam ở cuối ("ご指摘いただいたところをかきなおして…") xác nhận lại đúng phần được yêu cầu sửa ngay.',
    keypoint: 'Bài này có TỚI 3 chương bị nhận xét, nên bẫy chính là phân biệt "có vấn đề nhưng **bỏ qua**" với "có vấn đề và **phải sửa ngay**".'
  }
  ]
};
