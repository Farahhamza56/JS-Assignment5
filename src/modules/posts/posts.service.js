import { Post, User, Comment } from "../../models/associations.js";
import sequelize from "../../DB/connectionDB.js";

// B1
export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const post = new Post({ title, content, userId });
    await post.save();

    return res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// B2
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post." });
    }

    await post.destroy();
    return res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// B3
export const getPostsDetails = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        { model: User, as: "user", attributes: ["id", "name"] },
        { model: Comment, as: "comments", attributes: ["id", "content"] },
      ],
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// B4
export const getPostsCommentCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
      ],
      include: [{ model: Comment, as: "comments", attributes: [] }],
      group: ["Post.id"],
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};