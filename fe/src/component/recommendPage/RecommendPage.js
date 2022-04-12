import "./RecommendPage.scss";
function RecommendPage() {
  return (      
    <div className="Recommend_page">
      <div className="Recommend_page_tag">
        <div>
          <img
            src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/wmw7pawvopezbldjcy3i.jpg"
            className="cover_photo"
          ></img>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            className="avatar"
          ></img>
        </div>
        <p style={{ textAlign: "center" }}>Nguyễn Thành Công</p>
        <div className="number_of_followers">
          <span style={{ textAlign: "center" }}>10 bạn chung</span>
        </div>
        <div className="recommend_page_button">
          <button type="button" className="button_like_page">
            Kết bạn
          </button>
          <button type="button" className="button_dislike_page">
            Bỏ qua
          </button>
        </div>
      </div>

      <div className="Recommend_page_tag">
        <div>
          <img
            src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/wmw7pawvopezbldjcy3i.jpg"
            className="cover_photo"
          ></img>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            className="avatar"
          ></img>
        </div>
        <p style={{ textAlign: "center" }}>Lê Văn Long</p>
        <div className="number_of_followers">
          <span style={{ textAlign: "center" }}>5 bạn chung</span>
        </div>
        <div className="recommend_page_button">
          <button type="button" className="button_like_page">
            Kết bạn
          </button>
          <button type="button" className="button_dislike_page">
            Bỏ qua
          </button>
        </div>
      </div>

      <div className="Recommend_page_tag">
        <div>
          <img
            src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/wmw7pawvopezbldjcy3i.jpg"
            className="cover_photo"
          ></img>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            className="avatar"
          ></img>
        </div>
        <p style={{ textAlign: "center" }}>Nguyễn Thị Lan</p>
        <div className="number_of_followers">
          <span style={{ textAlign: "center" }}>2 bạn chung</span>
        </div>
        <div className="recommend_page_button">
          <button type="button" className="button_like_page">
            Kết bạn
          </button>
          <button type="button" className="button_dislike_page">
            Bỏ qua
          </button>
        </div>
      </div>

      <div className="Recommend_page_tag">
        <div>
          <img
            src="https://res.klook.com/image/upload/c_fill,w_750,h_500,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/wmw7pawvopezbldjcy3i.jpg"
            className="cover_photo"
          ></img>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            className="avatar"
          ></img>
        </div>
        <p style={{ textAlign: "center" }}>Phan Văn Minh</p>
        <div className="number_of_followers">
          <span style={{ textAlign: "center" }}>2 bạn chung</span>
        </div>
        <div className="recommend_page_button">
          <button type="button" className="button_like_page">
            Kết bạn
          </button>
          <button type="button" className="button_dislike_page">
            Bỏ qua
          </button>
        </div>
      </div>

    </div>
  );
}
export default RecommendPage;
