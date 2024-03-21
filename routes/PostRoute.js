const PostModel = require("../model/PostModel");
const cloudinary = require("../utils/Cloudinary");
const upload = require("../utils/Multer");

module.exports.AddPost = async (req, res) => {
  let result;

  try {
    // Vérifiez que req.files existe et contient des fichiers
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files were uploaded.",
        success: false,
      });
    }

    // Traiter l'image à télécharger
    for (let file of req.files) {
      const fileBuffer = file.buffer.toString("base64");
      result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${fileBuffer}`
      );
    }

    // Create a new post with Cloudinary image URL
    let post = new PostModel({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      created_by: req.body.created_by,
    });

    // Save post to your MongoDB database
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding a post",
      success: false,
    });
  }
};

module.exports.AllPost = async (req, res) => {
  try {
    // Récupérer tous les posts de la base de données
    const allPosts = await PostModel.find();

    res.json({
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching all posts",
    });
  }
};

module.exports.ViewPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      console.log(`Post non trouvée pour l'ID : ${req.params.id}`);
      return res.status(404).json({
        message: "Post non trouvée.",
        success: false,
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération du post",
      success: false,
    });
  }
};
