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
    `https://graph.facebook.com/${pageId}/feed?access_token=${page_access_token}`
  );
};
//Upload Image to App

export const uploadFileToFBApp = (appId, file, user_access_token) => {
  return axios.post(
    `https://graph.facebook.com/${appId}/uploads?file_length=${file.size}&file_type=${file.type}&access_token=${user_access_token}`
  );
};
