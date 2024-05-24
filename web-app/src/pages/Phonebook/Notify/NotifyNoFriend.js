export default function NotifyNoFriend() {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            className="notify_no_friend p-4 mt-4">
            <img src="https://chat.zalo.me/assets/invitation-emptystate.248ad1da229565685f19d3d527985812.png" alt="no_friend" />
            <h5 className="mt-4">Bạn chưa có bạn bè nào</h5>
            <p>Thêm bạn bè để bắt đầu trò chuyện</p>
        </div>
    )
}