import { Op } from "sequelize";
import { Comment, User, Post } from "../../models/associations.js";

// C1
export const createComments = async (req, res) => {
  try {
    const { comments } = req.body;

    await Comment.bulkCreate(comments);

    return res.status(201).json({ message: "comments created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// C2
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found." });
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment." });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: "Comment updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// C3
export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content },
    });

    return res.status(200).json({ comment, created });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// C4
export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;

   const result = await Comment.findAndCountAll({
  where: { content: { [Op.like]: `%${word}%` } },
});

    if (result.count === 0) {
      return res.status(404).json({ message: "no comments found." });
    }

    return res
      .status(200)
      .json({ count: result.count, comments: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// C5
export const getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// C6
export const getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      attributes: ["id", "content"],
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Post, as: "post", attributes: ["id", "title", "content"] },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "no comment found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};