window.MONDAI1_DATA = window.MONDAI1_DATA || {};
window.MONDAI1_DATA['2017-07'] = {
  examLabel: '2017-07',
  audioSrc: 'assets/audio/MD1/N1_7-2017.mp3',
  questions: [
  {
    number: 1,
    question: '大学の事務室で男の留学生と事務の人が話しています。 男の留学生はこの後、何をしなければなりませんか。',
    choices: ['申請書を手書きで書き直す','研究計画書を書き足す','すいせんしょを依頼する','成績証明書を申請する'],
    correctAnswer: 0,
    script: [
      { speaker:'男', spk:'m', text:'すみません。奨学金の申請の書類を書いてみたんですが、これで大丈夫でしょうか。' },
      { speaker:'女', spk:'f', text:'ちょっと見せてください。ああ、中はパソコンで書いたんですね。募集案内には自筆とありますから、自分で書いてください。' },
      { speaker:'男', spk:'m', text:'そうなんですか。わかりました。' },
      { speaker:'女', spk:'f', text:'それで、これが研究計画書ですね。今これで何字ぐらいですか。' },
      { speaker:'男', spk:'m', text:'えっと、千百字ちょっとです。もう少し書き足したほうがいいですか。' },
      { speaker:'女', spk:'f', text:'ううん、千二百字以内となっているので、それぐらいで十分ですよ。あっ、あと、推薦書と成績証明書がありませんよ。' },
      { speaker:'男', spk:'m', text:'はい、推薦書は先生にお願いして、来週の提出期限までにいただけることになっています。成績証明書も今申請中です。' },
      { speaker:'女', spk:'f', text:'そうですか。来週の水曜日までですからね。' },
      { speaker:'男', spk:'m', text:'はい。ありがとうございました。' }
    ],
    explanation: '- Câu hỏi hỏi việc nam du học sinh **phải làm sau cuộc nói chuyện**.\n- ① đúng vì đơn xin học bổng được viết bằng máy tính, trong khi hướng dẫn yêu cầu `自筆` — tự viết tay. Nhân viên nói trực tiếp: `自分で書いてください`.\n- ② không cần làm: bản kế hoạch nghiên cứu đã hơn 1.100 chữ và giới hạn là 1.200 chữ; nhân viên xác nhận `それぐらいで十分`.\n- ③ đã nhờ giáo viên rồi và sẽ nhận được trước hạn: `先生にお願いして…いただけることになっています`.\n- ④ đang trong quá trình xin cấp: `今申請中です`; không phải nhiệm vụ mới được giao.\n\n→ Chọn **①**.',
    keypoint: 'Câu hỏi hỏi việc nam du học sinh **phải làm sau cuộc nói chuyện**.'
  },
  {
    number: 2,
    question: '出版社で女の記者と雑誌の編集長が話しています。 女の記者はこの後まず、何をしなければなりませんか。',
    choices: ['別のタイプの店を取材する','取材した店の写真を変更する','文章を書き直す','会議で変更点を説明する'],
    correctAnswer: 0,
    script: [
      { speaker:'女', spk:'f', text:'編集長、担当しているパン屋の特集なんですが、原稿ができました。ご覧いただけますか。取材した店はすべて取り上げました。' },
      { speaker:'男', spk:'m', text:'そう。見せて。この間の企画会議では、三タイプの店を紹介することに決まったよね。商店街のパン屋、カフェつきのパン屋、移動販売のパン屋。' },
      { speaker:'女', spk:'f', text:'はい。' },
      { speaker:'男', spk:'m', text:'こうして見ると、ちょっと物足りないなあ。ううん、この三タイプとは少し視点が違うけど、最近サンドイッチの専門店が話題になってるらしいじゃない。まだ時間はあるから、こっちのほうもあたってみて。' },
      { speaker:'女', spk:'f', text:'はい。わかりました。' },
      { speaker:'男', spk:'m', text:'それに、写真、肝心のパンが写ってるのが少ないね。文章も少し練り直しが必要だなあ。まあ、載せる店が変わったら、いろんな変更が出るから、それは後でいいや。' },
      { speaker:'女', spk:'f', text:'はい。' },
      { speaker:'男', spk:'m', text:'取材終わってからでいいから、次の会議で変更点を説明できるよう準備しといて。' },
      { speaker:'女', spk:'f', text:'わかりました。' }
    ],
    explanation: '- Từ khóa của câu hỏi là **まず** — phải xác định việc làm trước tiên.\n- ① đúng: biên tập viên yêu cầu cô tìm hiểu và phỏng vấn thêm cửa hàng chuyên về sandwich: `こっちのほうもあたってみて`.\n- ② và ③ đúng là cần sửa ảnh, sửa bài, nhưng bị đẩy xuống sau bằng câu `それは後でいいや` vì nội dung còn phụ thuộc vào những cửa hàng cuối cùng được đăng.\n- ④ cũng làm sau khi phỏng vấn xong: `取材終わってからでいいから`.\n\n→ Trình tự là **phỏng vấn thêm → sửa ảnh/bài → chuẩn bị giải thích thay đổi**, nên chọn **①**.',
    keypoint: 'Từ khóa của câu hỏi là **まず** — phải xác định việc làm trước tiên.'
  },
  {
    number: 3,
    question: '日本語学校で、事務の女の人と男の人が話しています。 男の人はこの後、何をしなければなりませんか。',
    choices: ['招待状の作成と会場の変更','招待状の作成と名簿の更新','パスワードの変更と会場の変更','パスワードの変更と名簿の更新'],
    correctAnswer: 1,
    script: [
      { speaker:'女', spk:'f', text:'本田さん、今度のスピーチ大会の招待客に出す招待状、作ってもらえる。去年のが事務室のパソコンの中に保存してあるから、書式はそれを参考にして、日付とかテーマを変えて、宛名はまだ空欄でいいから。' },
      { speaker:'男', spk:'m', text:'はい。わかりました。' },
      { speaker:'女', spk:'f', text:'会場は例年通りのホールを予約したはずよね。' },
      { speaker:'男', spk:'m', text:'はい。先ほど確認済みです。設備も去年から特に変わったところはありませんでした。' },
      { speaker:'女', spk:'f', text:'ありがとう。早いのね。招待状を印刷してから、会場を変更することになったら大変だから、気になってたんだけど。' },
      { speaker:'男', spk:'m', text:'はい。それは大丈夫です。' },
      { speaker:'女', spk:'f', text:'あと、今年から新しく招待する方のリストを渡すから、招待客の名簿に追加しといて。' },
      { speaker:'男', spk:'m', text:'わかりました。' },
      { speaker:'女', spk:'f', text:'リストはパソコンに入っているけど、ファイルはパスワードがかかってるから、パスワード、先週替えたのを知っているよね。' },
      { speaker:'男', spk:'m', text:'はい。' }
    ],
    explanation: '- Đây là dạng phải chọn **hai nhiệm vụ** còn phải làm.\n- Nhiệm vụ thứ nhất là tạo thư mời dựa trên mẫu năm trước, đổi ngày và chủ đề: `招待状、作ってもらえる`.\n- Nhiệm vụ thứ hai là thêm những khách mới vào danh sách: `招待客の名簿に追加しといて`.\n- Không cần đổi địa điểm: hội trường như mọi năm đã được đặt và kiểm tra xong; `それは大丈夫です` xác nhận không có vấn đề.\n- Không cần đổi mật khẩu: mật khẩu đã được đổi **tuần trước** (`先週替えた`) và người nam đã biết. Đây chỉ là thông tin để mở tệp.\n\n→ Chọn **②**.',
    keypoint: 'Đây là dạng phải chọn **hai nhiệm vụ** còn phải làm.'
  },
  {
    number: 4,
    question: '電話で、演劇部の部長と女の学生が話しています。 女の学生は来週のリハーサルまでに、何をしなければなりませんか。',
    choices: ['主役の衣装のデザインを変える','主役の衣装を作る','妹役の衣装のデザインを変える','妹役の衣装を作る'],
    correctAnswer: 1,
    script: [
      { speaker:'男', spk:'m', text:'もしもし。' },
      { speaker:'女', spk:'f', text:'あっ、先輩、衣装係の川村です。あのう、演劇発表会のリハーサルのことなんですが、来週の。' },
      { speaker:'男', spk:'m', text:'うん、どうした？' },
      { speaker:'女', spk:'f', text:'あの、そのときに、衣装チェックをすることになってますよね。で、今作り始めてるんですが、もらった布では足りないようなんです。' },
      { speaker:'男', spk:'m', text:'えっ、ほんとう。えっと、川村さんの担当は主人公のワンピースとその妹のスカートだったよね。' },
      { speaker:'女', spk:'f', text:'はい。今主人公のワンピースを作り始めたとこなんですが、布を買うときに、寸法を間違えたんじゃないでしょうか。このままだと、残った分で、妹のスカートはかなり厳しそうなんです。' },
      { speaker:'男', spk:'m', text:'その布、お店にももうないんだよね。妹だけ違う布を使うわけにはいかないし、参ったなあ。でも、今からデザイン変えるのもね。とりあえずワンピースはそのまま作って、リハーサルに持ってきて、残った分でどんな衣装ができるかそのとき検討しよう。' },
      { speaker:'女', spk:'f', text:'わかりました。' },
      { speaker:'男', spk:'m', text:'リハーサルから本番まではあまり日がないし、また大至急お願いってなっちゃうけど、よろしくね。' },
      { speaker:'女', spk:'f', text:'はい。' }
    ],
    explanation: '- Câu hỏi có kỳ hạn: **来週のリハーサルまでに** — việc nào phải hoàn thành trước buổi diễn thử tuần sau.\n- ② đúng vì trưởng câu lạc bộ chốt bằng `とりあえずワンピースはそのまま作って、リハーサルに持ってきて` — trước mắt cứ may nguyên mẫu váy của vai chính và mang đến buổi diễn thử.\n- ① không đổi thiết kế vai chính: `そのまま作って`.\n- ③ chưa đổi ngay thiết kế vai em gái; sẽ dùng phần vải còn lại để bàn tại buổi diễn thử: `そのとき検討しよう`.\n- ④ chưa phải may xong trước buổi diễn thử vì vẫn chưa quyết định được kiểu trang phục cho vai em gái.\n\n→ Chọn **②**.',
    keypoint: 'Câu hỏi có kỳ hạn: **来週のリハーサルまでに** — việc nào phải hoàn thành trước buổi diễn thử tuần sau.'
  },
  {
    number: 5,
    question: '会社で部長と女の社員が話しています。 女の社員は何をしなければなりませんか。',
    choices: ['パッケージのデザインを改善する','香りを改良する','せんじょうりょくのデータを示す','販売価格の案を出す'],
    correctAnswer: 0,
    script: [
      { speaker:'男', spk:'m', text:'森下さん、森下さんたちの開発チームがすすめてきた新しい洗剤、今日の会議で発売ということに決まったよ。消費者アンケートの結果が評価されてね。' },
      { speaker:'女', spk:'f', text:'そうですか。ありがとうございます。' },
      { speaker:'男', spk:'m', text:'会議では、少し要望も出たんだ。この価格帯の他社のと並べてみたときに、パッケージの印象が弱いって意見が出て、後発なんだから、目を引くようなものをという注文なんだ。' },
      { speaker:'女', spk:'f', text:'はい、デザイナーと相談して、いくつか案を出してもらいます。' },
      { speaker:'男', spk:'m', text:'うん。来週の会議に出せるように、お願いしますよ。アンケートで、香りについて高い評価が出たことが決め手になったね。' },
      { speaker:'女', spk:'f', text:'力を入れたところですから、チームのみんな喜びます。' },
      { speaker:'男', spk:'m', text:'もちろん。洗浄力の高さはデータで示されてるしね。残る課題は販売価格をいくらにするかだけど、これは開発チームが出してくれた案を、営業に回して検討してもらうことになったから。' },
      { speaker:'女', spk:'f', text:'わかりました。' }
    ],
    explanation: '- Đây là dạng **Review/góp ý**: sản phẩm được thông qua nhưng cuộc họp nêu một điểm cần sửa.\n- ① đúng: bao bì bị đánh giá là chưa nổi bật (`パッケージの印象が弱い`), nên nữ nhân viên sẽ bàn với nhà thiết kế và chuẩn bị vài phương án cho cuộc họp tuần sau.\n- ② mùi hương không cần cải tiến; ngược lại, đây là điểm được khảo sát đánh giá cao và là yếu tố quyết định việc phát hành.\n- ③ khả năng giặt tẩy đã được chứng minh bằng dữ liệu: `データで示されてる`.\n- ④ nhóm phát triển đã đưa ra phương án giá; bộ phận kinh doanh sẽ nhận và xem xét, nên không phải nhiệm vụ mới của nữ nhân viên.\n\n→ Chọn **①**.',
    keypoint: 'Đây là dạng **Review/góp ý**: sản phẩm được thông qua nhưng cuộc họp nêu một điểm cần sửa.'
  },
  {
    number: 6,
    question: '図書館で、職員が職場体験の参加者に話しています。 参加者はまず何をしますか。',
    choices: ['本の貸し出し','新しい本の情報の登録','本の修理作業の見学','棚の本の整理'],
    correctAnswer: 2,
    script: [
      { speaker:'女', spk:'f', text:'一日職場体験にご参加の皆様、おはようございます。本日の予定ですが、皆さんからやってみたいという声が一番多かった、カウンターでの貸し出し業務は、事前にご案内したとおり、午後に体験していただきます。午前中については、少し予定に変更があります。事前のご案内では、まず新しい本の情報をコンピューターに入力する作業、その次に、破れた本の修理作業の見学、の順で行うことになっていましたが、ええ、コンピューターの不具合のため、この順番を逆にします。コンピューターは今業者が修理していて、あと少しで復旧する見込みです。この二つに続けて、館内の棚にある本の整理もしていただきます。では、よろしくお願いします。' }
    ],
    explanation: '- Câu hỏi hỏi **まず** — hoạt động đầu tiên trong lịch thực tế, không phải lịch ban đầu.\n- ① việc cho mượn sách diễn ra vào buổi chiều: `午後に体験していただきます`.\n- ② theo thông báo cũ là việc đầu tiên, nhưng vì máy tính gặp trục trặc nên hai hoạt động buổi sáng bị đảo thứ tự: `この順番を逆にします`.\n- ③ vì đảo thứ tự, xem công việc sửa sách trở thành hoạt động đầu tiên.\n- ④ sắp xếp sách trên kệ được thực hiện sau hai hoạt động trên: `この二つに続けて`.\n\n→ Chọn **③**.',
    keypoint: 'Câu hỏi hỏi **まず** — hoạt động đầu tiên trong lịch thực tế, không phải lịch ban đầu.'
  }
  ]
};
