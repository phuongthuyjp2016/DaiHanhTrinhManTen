window.MONDAI1_DATA = window.MONDAI1_DATA || {};
window.MONDAI1_DATA['2010-07'] = {
  examLabel: '2010-07',
  audioSrc: 'assets/audio/MD1/N1_7-2010.mp3',
  questions: [
  {
    number: 1,
    question: '女の人が電話で話しています。女の人は講演会の当日、何をしなければなりませんか。',
    choices: ['参加費を支払う。','入場券を受け取る。','田中先生の本を買う。','名前と連絡先を言う。'],
    correctAnswer: 1,
    script: [
      { speaker:'女', text:'もしもし、あのう、来週四日の講演会に参加したいんですが、まだあいてますか。' },
      { speaker:'男', text:'ああ、田中先生の講演会ですね、少々お待ちください。調べますので。' },
      { speaker:'女', text:'お願いします。' },
      { speaker:'男', text:'あっ、もしもし、お待たせしました。まだ余裕がございますので、ご参加いただけます。' },
      { speaker:'女', text:'ああ、そうですか。よかった。' },
      { speaker:'男', text:'参加費は今週末までにお振込みください。' },
      { speaker:'女', text:'はい。' },
      { speaker:'男', text:'当日は一時間前からの開場となりますが。受付で入場券をお受け取りください。開始時間まで、先生の著書の展示販売も行っております。定価の二割引ですので、ぜひご利用ください。' },
      { speaker:'女', text:'あっ、そうですか、わかりました。' },
      { speaker:'男', text:'それでは、恐れ入りますが、お名前とご連絡先お願いします。' }
    ],
    explanation: 'Vào đúng ngày diễn ra buổi giảng (当日), người phụ nữ phải đến quầy lễ tân nhận vé vào cửa: 「受付で入場券をお受け取りください」. Việc đóng phí tham gia phải hoàn tất trước đó (今週末までにお振込み), còn việc nói tên/liên lạc là ngay lúc gọi điện đặt chỗ — không phải việc làm trong ngày diễn ra sự kiện.',
    keypoint: '「受付で入場券を受け取ってください」は「当日」(ngày diễn ra) làm — cần phân biệt với việc đã xong trước đó (振込み) hoặc việc làm ngay lúc gọi điện (nói tên/liên lạc).'
  },
  {
    number: 2,
    question: '会社で女の人と男の人が会議について話しています。男の人が何をしなければなりませんか。',
    choices: ['開始時間を早める。','時間を短くする。','議題を少なくする。','議題を事前に知らせる。'],
    correctAnswer: 3,
    script: [
      { speaker:'女', text:'田中さん、例の金曜日の会議の件なんだけどね。' },
      { speaker:'男', text:'はい。' },
      { speaker:'女', text:'上のほうから、会議の効率化をはかるための指針っていうのが来てるんだけど。' },
      { speaker:'男', text:'はい。' },
      { speaker:'女', text:'それでね、まず会議の開始時間だけど、原則として、九時から十二時までの間って書いてある。' },
      { speaker:'男', text:'ああ。会議は十時からの予定です。' },
      { speaker:'女', text:'あっ、そうでしたね。それから、会議時間なんだけど、二時間を越えちゃいけない。' },
      { speaker:'男', text:'ああ、それは何とかなりますね。' },
      { speaker:'女', text:'それと、議題は四つ以下にして、遅くとも前日までにメールで参加者に知らせておくこと。' },
      { speaker:'男', text:'あっ、そうなんですか。では、今日のうちにやっておきます。数のほうは問題ないですね。' },
      { speaker:'女', text:'そうね、じゃあ、準備、よろしくね。' },
      { speaker:'男', text:'はい、わかりました。' }
    ],
    explanation: 'Theo chỉ thị mới: giờ họp (10 giờ, nằm trong khung 9–12 giờ) và thời lượng (dưới 2 tiếng) đều đã đạt yêu cầu, không cần đổi. Chỉ còn việc gửi email thông báo nghị trình cho người tham dự trước 1 ngày, và người đàn ông nói sẽ làm ngay trong hôm nay: 「今日のうちにやっておきます」.',
    keypoint: 'Chú ý câu「今日のうちにやっておきます」— dấu hiệu chỉ hành động SẼ làm ngay, đó chính là đáp án.'
  },
  {
    number: 3,
    question: 'ホテルで男がフロントに話しています。フロントの人はこの後、客室係りにどんな指示を出しますか。',
    choices: ['洗面所を点検する。','毛布を補充する。','別の部屋を用意する。','荷物を運ぶ。'],
    correctAnswer: 0,
    script: [
      { speaker:'女', text:'はい、フロントでございます。' },
      { speaker:'男', text:'あのう、洗面台の水の流れが悪いんだけど、後、毛布もって来てくれないかな。' },
      { speaker:'女', text:'大変申し訳ございません。あの、お客様。毛布はクローゼットの上の棚にございます。洗面台のほうは、係りの者を伺わせますので、しばらく、お待ちいただけますでしょうか。' },
      { speaker:'男', text:'どのくらいかかるかな。疲れてて早く寝たいんだよね。' },
      { speaker:'女', text:'それでしたら。ほかのお部屋にお移りいただくことも可能ですが。' },
      { speaker:'男', text:'うーん、荷物あけちゃったし、とりあえず見てくれる。' },
      { speaker:'女', text:'承知いたしました。すぐに手配いたします。' }
    ],
    explanation: 'Khách phàn nàn nước ở bồn rửa mặt chảy yếu. Lễ tân nói chăn đã có sẵn trong tủ nên không cần mang thêm, còn khoản bồn rửa sẽ cử nhân viên tới kiểm tra. Khách từ chối đổi phòng, chỉ muốn "xem giúp" (とりあえず見てくれる) — nên lễ tân sẽ chỉ đạo nhân viên phòng đi kiểm tra bồn rửa mặt.',
    keypoint: '「見てくれる」= khách yêu cầu kiểm tra tại chỗ, không phải đổi phòng hay mang thêm chăn.'
  },
  {
    number: 4,
    question: '会社で男の人と女の人が話しています。女の人は、明日何をしなければなりませんか。',
    choices: ['国内出張に出かける。','会議の通訳をする。','資料を作成する。','海外出張に出かける。'],
    correctAnswer: 1,
    script: [
      { speaker:'男', text:'今度の国際共同プロジェクトについてなんだけど。' },
      { speaker:'女', text:'はい、来月から予備調査のために、国連の支社を幾つか回る予定です。' },
      { speaker:'男', text:'あっ、そう。それでね。この件で明日アメリカの会社から責任者がくるんだけど、君に通訳を頼めないかな。実は予定していた人は急にこられなくなってね。' },
      { speaker:'女', text:'えっ？急に言われても、私に代役が務まりますか。' },
      { speaker:'男', text:'できそうな人は君しかいないんだよ。会議の資料を読み込んで準備してくれないかな。頼むよ。' },
      { speaker:'女', text:'えっ、そんな大役、自信ないんですが。' },
      { speaker:'男', text:'何とかお願いします。' },
      { speaker:'女', text:'はい。' },
      { speaker:'男', text:'ああ、そうそう、例の海外出張の件は許可が下りたから、そっちのほうの準備もよろしく。' },
      { speaker:'女', text:'はい、わかりました。' }
    ],
    explanation: 'Câu hỏi hỏi việc của "ngày mai" (明日). Ngày mai có người phụ trách từ công ty Mỹ đến, và cô được nhờ làm phiên dịch cho cuộc họp đó — đây chính là việc của ngày mai. Việc đọc tài liệu là chuẩn bị thêm, còn chuyến công tác nước ngoài tuy đã được duyệt nhưng chưa xác định ngày cụ thể.',
    keypoint: 'Từ khóa「明日」giới hạn phạm vi câu hỏi — chỉ lấy đúng việc diễn ra vào ngày mai.'
  },
  {
    number: 5,
    question: '繊維工場の男の人が取引先の女の人と話しています。男の人はこの後、どうしますか。',
    choices: ['最新の方法で生地を織る。','生地の色を変える。','生地から服を作る。','人手を増やす。'],
    correctAnswer: 1,
    script: [
      { speaker:'男', text:'どうですか。この生地なんですけど。' },
      { speaker:'女', text:'ああ、いいですね。この触り心地はなかなかほかではないんですよね。' },
      { speaker:'男', text:'そうでしょう。うちでは昔からの織り方で作ってるんで、この独特の感じが出るんですよ。' },
      { speaker:'女', text:'そうですか。新しいやり方ですと、こうはならないんですか。' },
      { speaker:'男', text:'いや、無理ですね。手間がかかっても、うちではその点にこだわってますからね。' },
      { speaker:'女', text:'なるほどね。色合いはかえられますか。' },
      { speaker:'男', text:'ご希望をいっていただければ、微妙な違いも出せますよ。' },
      { speaker:'女', text:'じゃあ、もう少し、淡い感じを出していただければ、私たちのイメージに合うんですが。' },
      { speaker:'男', text:'ああ、そうですか。わかりました。じゃ、2、3日ください。' },
      { speaker:'女', text:'後、こちらでは、多くに仕上げていただくことも可能ですか。' },
      { speaker:'男', text:'うん、ちょっと時間かかりますね。今、人手が足りないんですよ。厳しくてね。' },
      { speaker:'女', text:'ああ、そうですか。それですと、難しいですね。' },
      { speaker:'男', text:'すみません。じゃ、ご希望に合うようにやってみます。' },
      { speaker:'女', text:'はい、お願いします。' }
    ],
    explanation: 'Khách hàng nữ đưa ra 2 yêu cầu: đổi màu vải nhạt hơn (được đồng ý, hẹn 2–3 ngày) và tăng số lượng sản xuất (bị từ chối vì thiếu nhân lực). Cuối cùng người đàn ông nói sẽ cố làm theo đúng nguyện vọng của khách — điều duy nhất khả thi còn lại là đổi màu vải.',
    keypoint: 'Yêu cầu đầu (đổi màu) được nhận lời「わかりました」; yêu cầu sau (tăng số lượng) bị từ chối vì「人手が足りない」.'
  },
  {
    number: 6,
    question: '電話で女の人と男の人が話しています。男の人はホテルにキャンセル料をいくら払わなければなりませんか。',
    choices: ['10,000円','8,000円','2,000円','1,000円'],
    correctAnswer: 1,
    script: [
      { speaker:'女', text:'はい、北国ホテルでございます。' },
      { speaker:'男', text:'あのう、明日の予約お願いしてた山田ですが、急用ができてキャンセルしたいんですけど。' },
      { speaker:'女', text:'かしこまりました。山田様ですね。一万円の部屋をご予約ですね。はい、そうしましたら、所定のキャンセル料をいただくことになりますが、よろしいでしょうか。' },
      { speaker:'男', text:'えーと、キャンセル料は確か、80パーセントでしたっけ。' },
      { speaker:'女', text:'えー、あのう。ご連絡なしの場合は全額。ご連絡いただいた場合は、当日が80パーセント、前日は二十パーセントとなっております。' },
      { speaker:'男', text:'ええー、痛いなあ。' },
      { speaker:'女', text:'あっ、お客様、申し訳ございません。前日の午後九時以降にご連絡いただいた場合は、当日扱いとさせていただいております。ただいま十時を回っておりますので。' },
      { speaker:'男', text:'ええー。なに。もう当日扱いになるの？それはひどいなあ。' },
      { speaker:'女', text:'誠に申し訳ございません。お送りしたパンフレットに明記しておりますので。' },
      { speaker:'男', text:'そうか。しょうがないな。' }
    ],
    explanation: 'Phòng giá 10.000円. Không báo hủy trước: phí 100% (10.000円); báo hủy trong ngày: 80% (8.000円); báo hủy từ hôm trước: 20% (2.000円). Vì khách gọi hủy sau 21h hôm trước — quá giờ quy định — nên bị tính theo mức "hủy trong ngày": 80% × 10.000円 = 8.000円.',
    keypoint: 'Phân biệt 3 mức phí theo thời điểm báo hủy: không báo (toàn phần) / báo trong ngày (80%) / báo từ hôm trước (20%).'
  }
]
};
