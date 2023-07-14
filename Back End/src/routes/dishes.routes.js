const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const DishesController = require("../controllers/DishesController")
const DishImageController = require("../controllers/DishImageController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishImageController = new DishImageController()

//aplica o middleware de autentifição em todas as rotas
dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get("/", dishesController.index)
dishesRoutes.post("/", dishesController.create)
dishesRoutes.put("/:id", dishesController.update)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.delete("/:id", dishesController.delete)

dishesRoutes.patch("/image/:id", ensureAuthenticated, upload.single("image"), dishImageController.update)

module.exports = dishesRoutes

// metodo single carrega um arquivo