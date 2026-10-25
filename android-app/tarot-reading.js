// Editorial interpretations for reflection. No external AI service or personal prompts leave the device.
export const TOPICS={work:'Công việc',money:'Tài chính',love:'Tình cảm & Quan hệ',mind:'Chữa lành tâm trí'};
export const SPREADS={1:['Năng lượng hôm nay'],3:['Gốc rễ / Quá khứ','Thực tại / Thách thức','Giải pháp / Hướng đi'],5:['Tâm thế hiện tại','Cơ hội ẩn giấu','Vật cản cần vượt qua','Nguồn lực hỗ trợ','Kết quả & Hành động']};
// Per card, each topic has a distinct upright insight, reversed insight and concrete action.
const rows=[
[
['Bạn muốn bắt đầu nhưng chưa có đủ thông tin; tinh thần học việc giúp bạn tiến lên.','Sự hào hứng có thể khiến bạn nhận việc trước khi hiểu khối lượng.','Hỏi rõ một đầu việc, thời hạn và tiêu chí hoàn thành trước khi nhận.'],
['Bạn có thể bắt đầu một thói quen tiền bạc nhỏ mà không cần đợi thu nhập cao.','Một lời mời kiếm tiền nhanh dễ khiến bạn bỏ qua chi phí và rủi ro.','Ghi đủ phí và giới hạn khoản có thể mất trước khi quyết định.'],
['Sự cởi mở giúp một cuộc trò chuyện mới bớt nặng kỳ vọng.','Bạn có thể đang tin vào hình dung về người kia hơn những gì họ thực sự làm.','Đặt một câu hỏi chân thành và quan sát cách họ giữ lời.'],
['Bạn được phép thử lại sau một giai đoạn bế tắc.','Mong muốn bỏ hết mọi thứ có thể là dấu hiệu bạn đang quá tải.','Thử một thay đổi nhỏ trong 10 phút thay vì quyết định lớn khi kiệt sức.']
],
[
['Bạn có kỹ năng dùng được ngay, dù vẫn thấy mình chưa đủ giỏi.','Quá nhiều công cụ và kế hoạch có thể đang thay thế việc bắt tay làm.','Dùng một công cụ quen thuộc để hoàn thành bản nháp trong 25 phút.'],
['Khả năng quản lý dòng tiền quan trọng hơn việc tìm mẹo làm giàu mới.','Những lời quảng bá đẹp có thể che khuất điều bạn chưa hiểu.','Đối chiếu số dư, khoản phải trả và tiền dùng được trong tuần.'],
['Nói rõ nhu cầu giúp người kia hiểu bạn hơn những tín hiệu mập mờ.','Bạn có thể đang cố gây ấn tượng thay vì cho thấy con người thật.','Nói một nhu cầu cụ thể mà không thử lòng đối phương.'],
['Một hành động nhỏ nằm trong tầm kiểm soát có thể giúp bạn lấy lại chủ động.','Cố kiểm soát mọi cảm xúc khiến bạn càng mệt.','Chọn một việc làm được hôm nay và cho phép những việc khác chờ.']
],
[
['Trước tiếng nói lớn trong nhóm, sự quan sát của bạn vẫn có giá trị.','Im lặng quá lâu có thể khiến những điều chưa rõ thành suy diễn.','Viết ra một điều đã biết và một điều cần hỏi người phụ trách.'],
['Khoảng dừng trước khi mua giúp bạn nhận ra nhu cầu thật.','Linh cảm không thay thế được kiểm tra điều khoản và số liệu.','Đọc điều kiện rút tiền, phí và bên chịu trách nhiệm trước khi đồng ý.'],
['Bạn cần nghe cả lời nói lẫn cảm giác của mình trong mối quan hệ.','Giữ mọi băn khoăn trong lòng có thể biến khoảng cách nhỏ thành nghi ngờ.','Hỏi trực tiếp một điều bạn đang đoán thay cho người kia.'],
['Khoảng lặng có thể giúp bạn nhận diện cảm xúc bị bỏ quên.','Bạn có thể đang nghĩ vòng tròn mà chưa tìm được điều mình cần.','Gọi tên cảm xúc và ghi một nhu cầu cơ bản chưa được đáp ứng.']
],
[
['Chất lượng phát triển khi bạn dành thời gian nuôi dưỡng thay vì chỉ chạy hạn.','Chăm việc cho mọi người có thể khiến phần việc của bạn bị bỏ lại.','Dành một khung giờ không bị gián đoạn cho việc quan trọng của mình.'],
['Chi cho nhu cầu thiết yếu và sức khỏe là một phần của chăm sóc bản thân.','Mua để tự thưởng liên tục có thể đang bù cho cảm giác thiếu thốn.','Tách một khoản chăm sóc cần thiết khỏi khoản mua theo cảm xúc.'],
['Sự quan tâm đều đặn có sức nặng hơn cử chỉ lớn hiếm hoi.','Cho đi quá nhiều có thể khiến bạn chờ đợi sự đáp lại mà chưa nói ra.','Hỏi nhau một việc nhỏ có thể hỗ trợ và thống nhất giới hạn.'],
['Cơ thể cần được chăm trước khi bạn yêu cầu mình mạnh mẽ hơn.','Bạn có thể đang chăm người khác đến mức quên nhu cầu của mình.','Ăn một bữa đủ và dành 15 phút nghỉ không gắn với thành tích.']
],
[
['Một khuôn khổ rõ ràng giảm việc phải đoán ý người khác.','Cố làm mọi thứ theo ý mình có thể đang chặn sự hợp tác.','Thống nhất trách nhiệm và cho đồng đội quyền chọn cách thực hiện.'],
['Ngân sách giúp bạn biết mình có thể tự do ở đâu.','Quản tiền quá cứng có thể khiến bạn nản rồi chi bù.','Đặt hạn mức linh hoạt cho một khoản hay vượt dự kiến.'],
['Sự ổn định đến từ thỏa thuận rõ và giữ lời.','Kiểm soát lịch trình của người kia dễ bị nhầm với quan tâm.','Thảo luận một ranh giới áp dụng công bằng cho cả hai.'],
['Một nhịp sinh hoạt có thể làm ngày rối trở nên dễ chịu hơn.','Tự ép mình theo lịch hoàn hảo có thể làm cảm giác thất bại tăng lên.','Giữ một mốc sinh hoạt vừa sức và bỏ bớt một yêu cầu không cần thiết.']
],
[
['Kinh nghiệm của người đi trước có thể giúp bạn tránh một vòng thử sai.','Quy trình quen thuộc có thể không còn phù hợp với tình huống mới.','Hỏi lý do của một quy định trước khi làm theo hoặc đề nghị đổi.'],
['Kiến thức căn bản giúp bạn đọc các lựa chọn tài chính tỉnh táo hơn.','Làm theo số đông không đảm bảo một sản phẩm phù hợp với bạn.','Kiểm tra thông tin từ nguồn chính thức thay vì nhóm mách kèo.'],
['Những giá trị chung giúp hai người hiểu điều gì thật sự quan trọng.','Kỳ vọng của gia đình có thể đang lấn át mong muốn của chính bạn.','Phân biệt điều mình muốn với điều mình sợ người khác đánh giá.'],
['Một cộng đồng đáng tin có thể giúp bạn bớt thấy đơn độc.','Bạn không cần phù hợp mọi khuôn mẫu để được tôn trọng.','Tìm một người biết lắng nghe mà không bắt bạn phải giống họ.']
],
[
['Một lựa chọn nghề nghiệp cần phù hợp giá trị, không chỉ được công nhận.','Bạn có thể đang gật đầu để tránh làm người khác thất vọng.','So sánh hai lựa chọn theo thời gian, thu nhập và điều bạn coi trọng.'],
['Chi tiêu có chủ đích bắt đầu từ việc biết mình ưu tiên điều gì.','Một cam kết tiền bạc chung có thể đang thiếu cuộc nói chuyện rõ ràng.','Thống nhất ai trả gì và giới hạn trước một khoản chi chung.'],
['Gắn bó là lựa chọn được thể hiện bằng hành động hằng ngày.','Sức hút và sự phù hợp lâu dài có thể không trùng nhau.','Nói về một kỳ vọng thực tế thay vì chỉ hỏi người kia có yêu mình không.'],
['Bạn có thể chọn cách sống phù hợp mình dù vẫn còn do dự.','Xung đột giữa mong muốn và nghĩa vụ có thể đang tiêu hao năng lượng.','Viết một lựa chọn bảo vệ giá trị của mình mà vẫn tôn trọng người khác.']
],
[
['Định hướng rõ giúp bạn đi qua một tuần nhiều việc.','Làm nhanh hơn chưa chắc giải quyết được việc đang đi sai hướng.','Chọn một kết quả chính và bỏ một việc không phục vụ kết quả đó.'],
['Một mục tiêu cụ thể giúp khoản tiết kiệm có lý do tồn tại.','Cố đuổi kịp người khác có thể khiến bạn nhận rủi ro vượt sức.','Đặt một mục tiêu theo khả năng thực tế thay vì so với người khác.'],
['Hai người tiến gần hơn khi cùng thống nhất hướng đi.','Cuộc tranh luận có thể đang biến thành cuộc thi ai thắng.','Dừng tranh đúng sai và hỏi kết quả nào có lợi cho cả hai.'],
['Chủ động một bước nhỏ có thể khôi phục cảm giác mình đang tiến tới.','Giữ mọi thứ trong tầm kiểm soát có thể khiến bạn không dám nghỉ.','Hoàn thành một việc nhỏ rồi chủ động kết thúc giờ làm.']
],
[
['Kiên định không nhất thiết phải đi cùng thái độ gay gắt.','Bạn có thể đang coi mệt mỏi là yếu kém nên tiếp tục gồng.','Đề nghị hỗ trợ một việc cụ thể trước khi quá tải.'],
['Khả năng dừng một lần mua bốc đồng được rèn bằng từng lựa chọn nhỏ.','Tự trách vì lỡ chi có thể khiến bạn bỏ hẳn kế hoạch.','Ghi lại yếu tố kích hoạt lần chi gần nhất và điều chỉnh một bước.'],
['Sự dịu dàng và ranh giới có thể cùng tồn tại.','Chịu đựng mãi không phải là bằng chứng của tình yêu.','Nói rõ một hành vi bạn không chấp nhận và cách bạn sẽ bảo vệ mình.'],
['Bạn có thể đối xử tử tế với mình ngay khi chưa giải quyết xong vấn đề.','Giọng tự phê bình có thể đang to hơn sự việc thực tế.','Viết một câu bạn sẽ nói với người bạn đang gặp hoàn cảnh tương tự.']
],
[
['Một khoảng làm việc sâu giúp bạn phân biệt ưu tiên với tiếng ồn.','Tự làm hết có thể khiến bạn mắc kẹt mà không ai biết.','Xin phản hồi về một phần việc thay vì đợi hoàn hảo mới đưa ra.'],
['Rà lại giao dịch giúp bạn thấy thói quen mà trí nhớ dễ bỏ sót.','Né xem số dư có thể làm nỗi lo lớn hơn con số thật.','Xem ba giao dịch gần nhất và chọn một khoản có thể điều chỉnh.'],
['Khoảng riêng lành mạnh giúp bạn trở lại cuộc trò chuyện rõ ràng hơn.','Rút lui không giải thích dễ khiến người kia thấy bị bỏ rơi.','Nói mình cần bao lâu để bình tâm và hẹn lúc nói tiếp.'],
['Sự yên tĩnh có thể giúp bạn nghe nhu cầu của mình.','Ở một mình quá lâu có thể đang làm bạn mất kết nối.','Nhắn một người đáng tin rằng bạn muốn được trò chuyện.']
],
[
['Thay đổi bên ngoài đòi hỏi điều chỉnh thay vì tự nhận hết lỗi.','Bạn có thể đang chờ thời điểm hoàn hảo thay vì chuẩn bị phần kiểm soát được.','Lập một phương án dự phòng cho việc dễ bị thay đổi nhất.'],
['Thu chi biến động khiến khoản dự phòng có ý nghĩa thực tế.','Một lần may mắn không chứng minh chiến lược luôn hiệu quả.','Kiểm tra khoản chi cố định và khả năng chịu một tháng thu nhập thấp.'],
['Nhịp sống thay đổi có thể buộc hai người tìm cách kết nối mới.','Một vòng cãi vã lặp lại cần được gọi tên thay vì đổ cho số phận.','Chọn một điểm trong vòng lặp mà bạn có thể phản ứng khác đi.'],
['Cảm xúc thay đổi không xóa đi những tiến bộ bạn đã có.','Bạn có thể đang xem một ngày khó khăn như bằng chứng mình quay về số không.','Ghi một việc đã giúp bạn ổn hơn trong tuần và lặp lại nó.']
],
[
['Sự công bằng cần bằng chứng và thỏa thuận có thể kiểm tra.','Cảm giác bất công có thể tăng khi nhiệm vụ và quyền lợi mơ hồ.','Ghi lại đầu việc và trao đổi bằng ví dụ cụ thể.'],
['Đọc kỹ cam kết bảo vệ bạn tốt hơn việc ngại hỏi.','Một khoản nợ hoặc phí nhỏ bị lờ đi vẫn tạo áp lực.','Đối chiếu ngày đến hạn và khoản phải trả từ giấy tờ thực tế.'],
['Trách nhiệm cần được chia theo thỏa thuận chứ không theo suy đoán.','Đếm lỗi của nhau có thể đang thay thế việc giải quyết nhu cầu.','Nhận phần trách nhiệm của mình rồi đề nghị một thay đổi rõ ràng.'],
['Bạn có thể đánh giá sự việc công bằng hơn khi tách dữ kiện khỏi tự kết tội.','Bạn có thể đang áp tiêu chuẩn với mình khắt khe hơn với mọi người.','Viết điều đã xảy ra mà không dùng các từ luôn luôn hoặc chẳng bao giờ.']
],
[
['Dừng lại để đổi góc nhìn có thể tiết kiệm một lần làm lại.','Chờ đợi kéo dài có thể đang che một quyết định bạn ngại đưa ra.','Đặt hạn chót để hỏi thông tin còn thiếu rồi chọn bước tiếp theo.'],
['Trì hoãn một món mua có thể giúp bạn thấy mình không cần nó.','Hy sinh nhu cầu thiết yếu để giữ một khoản không phù hợp có thể gây hại.','Xem lại một cam kết đang giữ tiền mà không phục vụ ưu tiên.'],
['Lắng nghe góc nhìn khác không yêu cầu bạn từ bỏ ranh giới.','Cố cứu một mối quan hệ một mình có thể khiến bạn kiệt sức.','Nêu điều bạn có thể làm và điều cần sự tham gia từ cả hai.'],
['Nghỉ là một hành động chăm sóc chứ không phải đứng yên vô ích.','Bạn có thể đang mắc kẹt trong việc chờ mình có động lực.','Chia việc đang né thành bước đầu chỉ mất hai phút.']
],
[
['Một cách làm cũ có thể cần kết thúc để nhường chỗ cho cách hiệu quả hơn.','Bám vào việc đã đầu tư nhiều không khiến nó phù hợp hơn.','Chọn một thói quen làm việc không còn hữu ích để dừng thử một tuần.'],
['Dừng một khoản chi lặp lại có thể mở khoảng thở cho ngân sách.','Tiếc tiền đã bỏ ra có thể khiến bạn tiếp tục chi để gỡ.','Đánh giá quyết định tiếp theo theo chi phí từ hôm nay, không theo tiền đã mất.'],
['Một giai đoạn thay đổi cần được thừa nhận thay vì giả vờ như cũ.','Níu hình ảnh quá khứ có thể làm bạn bỏ qua nhu cầu hiện tại.','Nói rõ điều đã thay đổi và điều bạn cần để tiếp tục.'],
['Buông một kỳ vọng không còn phù hợp có thể là bước trưởng thành.','Bạn không cần ép mình hồi phục theo lịch của người khác.','Cất một việc gợi áp lực sang bên và chọn một điều giúp mình an toàn hôm nay.']
],
[
['Nhịp làm việc bền vững thường hiệu quả hơn những đợt cố sức ngắn.','Chuyển việc liên tục có thể làm bạn mệt mà vẫn không xong.','Gom các việc tương tự vào một khung 25 phút.'],
['Cân bằng giữa dự phòng và nhu cầu hiện tại giúp kế hoạch dễ duy trì.','Thắt chặt rồi chi bù là một vòng lặp cần giảm cực đoan.','Đặt mức tiết kiệm vừa sức và một khoản vui có giới hạn.'],
['Nhịp độ khác nhau có thể được thương lượng bằng sự kiên nhẫn.','Nhượng bộ liên tục có thể khiến sự hòa thuận chỉ còn ở bề ngoài.','Tìm một thỏa thuận mà cả hai đều điều chỉnh một phần.'],
['Những điều cơ bản đều đặn có thể giúp ngày sống bớt chao đảo.','Bạn có thể đang thử quá nhiều cách tự cải thiện cùng lúc.','Giữ một việc chăm sóc có tác dụng và tạm ngừng một yêu cầu dư thừa.']
],
[
['Áp lực thành tích có thể đang buộc bạn giữ một thói quen không lành mạnh.','Nhận ra ràng buộc là cơ hội để thử một giới hạn mới.','Tắt một kênh công việc ngoài giờ trong khoảng thời gian đã thống nhất.'],
['Mua để xoa dịu căng thẳng thường để lại cả món đồ lẫn nỗi lo.','Bạn đang có cơ hội ngắt một thói quen chi mà không cần tự kết tội.','Gỡ một thông báo mua sắm và chờ 24 giờ trước món không thiết yếu.'],
['Sự gắn bó cần đi cùng quyền tự do và sự tôn trọng.','Nhận ra mô thức kiểm soát có thể giúp bạn tìm lại tiếng nói.','Trao đổi với người đáng tin về một ranh giới bạn đang bị gây áp lực vượt qua.'],
['Một cách giải tỏa tức thời có thể khiến bạn khó chịu hơn về sau.','Bạn có thể thay đổi mối quan hệ với thói quen bằng bước nhỏ thay vì lời thề.','Ghi lúc cơn thôi thúc xuất hiện và thử một lựa chọn ít gây tổn hao hơn.']
],
[
['Một sự cố có thể bộc lộ điểm yếu trong cách phối hợp, không phải giá trị của bạn.','Né một cuộc trao đổi khó có thể khiến lỗi nhỏ kéo dài.','Xác nhận điều gì hỏng, ai xử lý và bước khắc phục đầu tiên.'],
['Khoản phát sinh nhắc bạn nhìn lại phần dự phòng thực tế.','Sợ nhìn con số có thể khiến bạn trì hoãn xử lý điều còn cứu được.','Liệt kê khoản cấp thiết trước rồi liên hệ bên liên quan về phương án.'],
['Một sự thật khó nghe có thể yêu cầu cuộc nói chuyện rõ ràng hơn.','Giữ vẻ yên ổn không giải quyết điều đang khiến bạn mất an tâm.','Chọn lúc bình tĩnh để nói một sự việc cụ thể và tác động của nó.'],
['Khi nhiều thứ đảo lộn, ưu tiên nhu cầu cơ bản là đủ cho hôm nay.','Cố tỏ ra ổn có thể khiến bạn không nhận được hỗ trợ cần thiết.','Liên hệ một người đáng tin và nói rõ bạn cần họ giúp điều gì.']
],
[
['Một tiến bộ nhỏ có thể nhắc bạn rằng công sức vẫn có hướng đi.','Kỳ vọng phục hồi nhanh có thể khiến bạn bỏ qua bước tiến chậm.','Ghi một bằng chứng tiến bộ và đặt một mục tiêu vừa sức cho ngày mai.'],
['Kế hoạch tài chính nhỏ, thực hiện được giúp hy vọng có nền tảng.','Lời hứa đổi đời có thể đang thay thế một kế hoạch kiểm chứng được.','Chọn một mục tiêu tiền bạc có con số và thời hạn thực tế.'],
['Sự chân thành tạo chỗ cho kết nối sau một giai đoạn mất niềm tin.','Hy vọng người kia tự đổi có thể khiến bạn chờ không giới hạn.','Hỏi một cam kết cụ thể rồi quan sát hành động theo thời gian.'],
['Bạn không cần thấy tích cực mọi lúc để vẫn có thể hồi phục.','So mình với phiên bản tốt nhất của người khác có thể làm hy vọng mỏng đi.','Ghi một điều đã dễ chịu hơn và giảm một nguồn so sánh trong hôm nay.']
],
[
['Thông tin chưa đủ có thể khiến bạn gán ý nghĩa cho sự im lặng của đồng nghiệp.','Một điều mơ hồ có thể sáng rõ nếu bạn kiểm tra thay vì đoán.','Hỏi lại kỳ vọng bằng văn bản trước khi sửa cả phần việc.'],
['Lo lắng hoặc háo hức có thể làm rủi ro trông khác thực tế.','Bạn có thể bắt đầu phân biệt dữ kiện với lời đồn.','Kiểm tra nguồn, phí và điều kiện; hoãn quyết định khi còn điểm chưa rõ.'],
['Cảm giác bất an là điều cần lắng nghe, nhưng chưa phải bằng chứng về người kia.','Một hiểu lầm có thể được tháo bằng câu hỏi không buộc tội.','Nói điều bạn quan sát được và hỏi điều bạn chưa biết.'],
['Cảm xúc mạnh có thể làm tương lai trông đáng sợ hơn dữ kiện đang có.','Nhận ra mình đang suy diễn giúp bạn tạo một khoảng dừng.','Viết hai cột: sự việc đã xảy ra và câu chuyện mình đang nghĩ về nó.']
],
[
['Một thành quả đáng được ghi nhận để bạn hiểu cách làm nào hiệu quả.','Áp lực phải luôn nổi bật có thể khiến bạn khó tận hưởng tiến bộ.','Ghi nhận đóng góp của mình và một người đã giúp công việc tốt hơn.'],
['Sự rõ ràng về thu chi giúp bạn tận hưởng trong giới hạn phù hợp.','Lạc quan có thể khiến bạn bỏ quên khoản chi sắp đến hạn.','Kiểm tra khoản phải trả rồi chọn một phần thưởng vừa ngân sách.'],
['Niềm vui giản dị có thể làm kết nối nhẹ hơn những cuộc kiểm tra tình cảm.','Mong mọi thứ phải vui có thể khiến cảm xúc khó nói bị bỏ qua.','Dành thời gian cùng nhau và hỏi cả điều đang khiến người kia mệt.'],
['Một khoảnh khắc dễ chịu có giá trị dù ngày của bạn chưa hoàn hảo.','Cố ép mình vui có thể làm bạn thấy có lỗi vì buồn.','Chọn một hoạt động nhẹ khiến cơ thể dễ chịu mà không bắt mình phải vui.']
],
[
['Nhìn lại một việc cũ giúp bạn rút bài học trước bước chuyển mới.','Sợ bị đánh giá có thể khiến bạn trì hoãn đưa sản phẩm ra.','Xin phản hồi cho một bản nháp với một câu hỏi cụ thể.'],
['Đối diện thói quen cũ giúp bạn có lựa chọn khác hôm nay.','Tự trách vì quyết định trước đây có thể làm bạn ngại sửa kế hoạch.','Chọn một khoản chi lặp lại để điều chỉnh, không phán xét toàn bộ bản thân.'],
['Một cuộc nói chuyện thành thật có thể làm rõ điều cần tiếp tục hoặc thay đổi.','Nhắc lỗi cũ liên tục có thể khiến hai người không nghe được hiện tại.','Nói điều bạn cần từ bây giờ thay vì dùng quá khứ để kết tội.'],
['Bạn có thể rút kinh nghiệm mà không đồng nhất mình với sai sót.','Giọng phán xét bên trong có thể đang mượn lời người khác.','Viết một bài học cụ thể và một điều bạn cho phép mình làm lại.']
],
[
['Hoàn tất một chặng giúp bạn thấy năng lực đã tích lũy ra sao.','Việc gần xong có thể bị giữ lại vì bạn muốn nó hoàn hảo.','Xác định tiêu chí đủ tốt và đóng một đầu việc còn dang dở.'],
['Một mục tiêu đã đạt cần được ghi nhận trước khi đặt mốc mới.','Đuổi theo mốc tiếp theo ngay có thể khiến bạn quên mục đích ban đầu.','Đối chiếu tiến độ với nhu cầu thật trước khi nâng mục tiêu tiết kiệm.'],
['Bạn có thể nhìn mối quan hệ trong bức tranh rộng hơn một lần bất đồng.','Một chuyện chưa nói rõ có thể đang ngăn hai người khép lại giai đoạn cũ.','Chọn một điều cần làm rõ để không mang nó sang cuộc trò chuyện tiếp theo.'],
['Tiến bộ gồm cả những việc bạn đã học cách không ép mình nữa.','Cảm giác chưa đủ có thể tồn tại dù bạn đã đi rất xa.','Liệt kê ba thay đổi nhỏ so với một tháng trước và cho mình một khoảng nghỉ.']
]
];
export const READING_DATA=rows;
export function validateReading(input){
 if(!input||!Object.hasOwn(TOPICS,input.topic)||!Object.hasOwn(SPREADS,input.size)||!Number.isInteger(input.size)||!Array.isArray(input.cards)||input.cards.length!==input.size)throw Error('Trải bài không hợp lệ.');
 const seen=new Set();const cards=input.cards.map(c=>{if(!c||!Number.isInteger(c.tarotId)||c.tarotId<0||c.tarotId>21||typeof c.reversed!=='boolean'||seen.has(c.tarotId))throw Error('Lá bài không hợp lệ hoặc bị trùng.');seen.add(c.tarotId);return {tarotId:c.tarotId,reversed:c.reversed}});
 return {topic:input.topic,size:input.size,cards};
}
export function shuffleDeck({wall=Date.now(),start=0,end=performance.now(),entropy=0}={}){
 // Timing personalizes the ritual; entropy avoids identical decks on rounded clocks.
 let seed=2166136261;for(const ch of `${wall}|${start}|${end}|${entropy}`){seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0}
 const random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296};
 const deck=Array.from({length:22},(_,tarotId)=>({tarotId,reversed:random()>=.8}));for(let i=21;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}return deck;
}
export function interpret(card,topic,size,index){
 const data=rows[card.tarotId][Object.keys(TOPICS).indexOf(topic)],position=SPREADS[size][index];
 const lens=size===1?'Hôm nay, hãy dùng hình ảnh này để quan sát lựa chọn của mình.':size===3?['Ở gốc rễ, hãy xem trải nghiệm nào đã tạo nên cách bạn phản ứng; đây là câu hỏi để đối chiếu, không khẳng định quá khứ của bạn.','Ở hiện tại, chú ý điều đang diễn ra thay vì điều bạn sợ sẽ xảy ra.','Ở hướng đi tiếp theo, đây là việc có thể thử, không phải một kết quả đã định.'][index]:['Về tâm thế hiện tại, hãy kiểm tra xem nhận định này có khớp với trải nghiệm của bạn.','Cơ hội có thể nằm ở điều nhỏ bạn chưa dành sự chú ý.','Vật cản ở đây là một mô thức đáng xem lại, không phải lỗi cố định ở bạn.','Nguồn lực có thể đến từ một người, thói quen hoặc thông tin bạn đã có.','Kết quả phụ thuộc lựa chọn và hoàn cảnh; hãy coi đây là một hướng thử trong hôm nay.'][index];
 return {position,insight:data[card.reversed?1:0],lens,action:data[2]};
}
export function synthesis(reading,names){const first=reading.cards[0],last=reading.cards.at(-1),a=interpret(first,reading.topic,reading.size,0),b=interpret(last,reading.topic,reading.size,reading.size-1);return {bridge:reading.size===1?`Với ${names[first.tarotId]}, chủ đề ${TOPICS[reading.topic].toLowerCase()} được nhìn qua một lựa chọn nhỏ.`:`Từ ${names[first.tarotId]} (${first.reversed?'ngược':'xuôi'}) đến ${names[last.tarotId]} (${last.reversed?'ngược':'xuôi'}): ${a.insight} Ở điểm cuối, ${b.insight.charAt(0).toLowerCase()+b.insight.slice(1)}`,action:b.action,question:'Bước nào trong gợi ý này phù hợp hoàn cảnh thật của bạn? Bạn có thể bỏ qua điều không phù hợp.',number:(reading.cards.reduce((n,c,i)=>n+(c.tarotId+1)*(i+1)*(c.reversed?2:1),0)%99)+1}}
