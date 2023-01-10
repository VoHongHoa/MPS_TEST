export const initTable = [{}];
export const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  // },
  {
    title: "Link",
    dataIndex: "link",
    render: (link) => (
      <a href={link} target="_blank">
        Link bài viết
      </a>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_time",
  },
  // {
  //   title: "Message",
  //   dataIndex: "message",
  // },
  // {
  //   title: "Story",
  //   dataIndex: "story",
  // },
  {
    title: "Số người tiếp cận",
    dataIndex: "post_impression_insight",
  },
  {
    title: "Lượt like",
    dataIndex: "like",
  },
  {
    title: "Lượt comment",
    dataIndex: "comment",
  },
  {
    title: "Lượt chia sẻ",
    dataIndex: "share_count",
  },
];
