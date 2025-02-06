const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

router.get("/", (req, res) => {
    connection.query("SELECT * FROM mahasiswa ORDER BY nim DESC", (err, rows) => {
        if (!err) {
            return res.status(200).json({
                status: true,
                message: "Success",
                data: rows,
            });
        } else {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
            });
        }
    });
});

router.post("/store",
    [
        body("nim").notEmpty(),
        body("nama").notEmpty(),
        body("alamat").notEmpty(),
        body("jenis_kelamin").notEmpty(),
        body("kelas").notEmpty(),
        body("angkatan").notEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
            status: false,
            message: errors.array(),
        });
    }
    let formData = {
        nim: req.body.nim,
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        kelas: req.body.kelas,
        angkatan: req.body.angkatan,
    };
    connection.query("INSERT INTO mahasiswa SET ?", formData, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
                error: err,
            });
        } else {
            return res.status(201).json({
                status: true,
                message: "Mahasiswa created",
                data: formData,
            });
        }
    });
}
);

router.get("/:nim", (req, res) => {
    let nim = req.params.nim;
    connection.query(
        "SELECT * FROM mahasiswa WHERE nim = ?",
        nim,
        (err, rows) => {
            if (err) {
                return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    } else {
        if (rows.length > 0) {
            return res.status(200).json({
                status: true,
                message: "Success",
                data: rows[0],
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Mahasiswa not found",
            });
        }
    }
}
);
});

router.put(
    "/:nim",
    [
        body("nim").notEmpty(),
        body("nama").notEmpty(),
        body("alamat").notEmpty(),
        body("jenis_kelamin").notEmpty(),
        body("kelas").notEmpty(),
        body("angkatan").notEmpty(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: errors.array(),
            });
        }
        let nim = req.params.nim;
        let formData = {
            nim: req.body.nim,
            nama: req.body.nama,
            alamat: req.body.alamat,
            jenis_kelamin: req.body.jenis_kelamin,
            kelas: req.body.kelas,
            angkatan: req.body.angkatan,
        };
        connection.query(
            "UPDATE mahasiswa SET ? WHERE nim = ?",
            [formData, nim],
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: "Internal Server Error",
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        message: "Post updated",
                        data: formData,
                    });
                }
            }
        );
    }
);

router.delete("/:nim", (req, res) => {
    let nim = req.params.nim;
    connection.query("DELETE FROM mahasiswa WHERE nim = ?", nim, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal Server Error",
            });
    } else {
        return res.status(200).json({
            status: true,
            message: "Mahasiswa deleted",
        });
    }
});
});

module.exports = router;
