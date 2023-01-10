import axios from "axios";

export const getAllPage = (token) => {
  return axios.get(
    `https://graph.facebook.com/me/accounts?access_token=${token}`
  );
};
//Tạo bài viết
export const createBlog = (pageId, page_access_token, data) => {
  return axios.post(
    `https://graph.facebook.com/v15.0/${pageId}/feed?access_token=${page_access_token}&message=${data.message}&link=${data.link}`
  );
};
//Tạo bài viết + hình ảnh
export const createImage = (pageId, page_access_token, data) => {
  return axios.post(
    `https://graph.facebook.com/v15.0/${pageId}/photos?access_token=${page_access_token}&message=${data.message}&url=${data.image}`
  );
};
//Lấy tất cả bài viết theo trang
export const getAllFeedByPageId = (pageId, page_access_token) => {
  return axios.get(
    `https://graph.facebook.com/${pageId}/feed?fields=actions,id,icon,created_time,message,story,shares,likes.summary(true),comments.summary(true),insights.metric(post_impressions_unique)&access_token=${page_access_token}`
  );
};

// export const getAllFeedByPageId = (pageId, page_access_token) => {
//   return axios.get(
//     `https://graph.facebook.com/${pageId}/feed?fields=id,message,created_time,insights.metric(post_impressions_unique,post_reactions_by_type_total)&access_token=${page_access_token}`
//   );
// };
//Update message cho bài viết
export const updateMessageForPost = (postId, message, page_access_token) => {
  return axios.post(
    `https://graph.facebook.com/${postId}?message=${message}&access_token=${page_access_token}`
  );
};
// Xóa bài biet
export const deletePosts = (postId, page_access_token) => {
  return axios.delete(
    `https://graph.facebook.com/${postId}?access_token=${page_access_token}`
  );
};
//Upload Image to App
export const uploadFileToFBApp = (appId, file, user_access_token) => {
  return axios.post(
    `https://graph.facebook.com/${appId}/uploads?file_length=${file.size}&file_type=${file.type}&access_token=${user_access_token}`
  );
};
//Get post
export const getPost = (postId, page_access_token) => {
  return axios.get(
    `https://graph.facebook.com/${postId}?fields=name&access_token=${page_access_token}`
  );
};
//Get post-insight
export const getPostInsight = (postId, page_access_token) => {
  return axios.get(`https://graph.facebook.com/${postId}/insights?metric=post_reactions_like_total,post_reactions_love_total,post_reactions_wow_total,post_reactions_haha_total,post_reactions_sorry_total
  &access_token=${page_access_token}`);
};
//Get post-comment
export const getCommentPost = (postId, page_access_token) => {
  return axios.get(
    `https://graph.facebook.com/${postId}/comments?access_token=${page_access_token}`
  );
};
