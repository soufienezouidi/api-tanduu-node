const db = require("../../models");
const Sequelize = require('sequelize');
const editJsonFile = require("edit-json-file");
const Translation = db.translations;
const fs = require('fs');
const path = require('path');
const {
    nextTick
} = require("process");
let fileEn = editJsonFile('./translation/en.json');
let fileFr = editJsonFile('./translation/fr.json');
let fileDe = editJsonFile('./translation/de.json');
let fileAr = editJsonFile('./translation/ar.json');
let fileIt = editJsonFile('./translation/it.json');
let fileEs = editJsonFile('./translation/es.json');
let filePt = editJsonFile('./translation/pt.json');
let fileSu = editJsonFile('./translation/fi.json');
let fileSv = editJsonFile('./translation/sv.json');
let filePo = editJsonFile('./translation/pl.json');
let fileNth = editJsonFile('./translation/nl.json');
let fileFar = editJsonFile('./translation/fa.json');


/* GET ALL TEXTS */

exports.getAllTexts = (req, res) => {
    Translation.findAll({
            where: {
                is_deleted: 0
            }
        })
        .then(data => {
            res.status(200).json(
                data)
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
};

/* get all texts by section*/
exports.getTextsByCRM = (req, res) => {
    Translation.findAll({
            where: {
                is_deleted: 0,
                section: 'crm'
            }
        })
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
}

/* get all texts by section*/
exports.getTextsByPlatform = (req, res) => {
    Translation.findAll({
            where: {
                is_deleted: 0,
                section: 'plateform'
            }
        })
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
}


/*-----------------------------*/
/* ADD NEW TEXT */

exports.addNewText = (req, res) => {
    Translation.findOne({
        where: {
            original_text_en: req.body.original_text_en,
            page: req.body.page,
            section: req.body.section
        }
    }).then(trans => {
        if (trans) // check if the text exist in the current page 
        {
            res.status(200).json({
                success: false,
                message: "Text already exist in this page"
            })
        } else if (trans && trans.is_deleted) {
            trans.is_deleted = 0;
            trans.save();
        } else {
            Translation.findOne({
                where: {
                    page: req.body.page
                },
                order: [
                    ["id", "DESC"]
                ]
            }).then(last => {
                Translation.create({
                    original_text_en: req.body.original_text_en,
                    original_text_fr: req.body.original_text_fr,
                    original_text_de: req.body.original_text_de,
                    original_text_ar: req.body.original_text_ar,
                    original_text_it: req.body.original_text_it,
                    original_text_es: req.body.original_text_es,
                    original_text_pt: req.body.original_text_pt,
                    original_text_po: req.body.original_text_po,
                    original_text_su: req.body.original_text_su,
                    original_text_sv: req.body.original_text_sv,
                    original_text_far: req.body.original_text_far,
                    original_text_nth: req.body.original_text_nth,
                    url: req.body.url,
                    page: req.body.page,
                    section: req.body.section,
                    is_deleted: 0
                }).then(new_trans => {
                    if (last && new_trans.page == last.page) {
                        new_trans.index = last.index + 1;
                        new_trans.save();
                    } else {
                        new_trans.index = 1;
                        new_trans.save();
                    }
                    const pg = new_trans.page.split(' ').join('_') + "_" + new_trans.section + "." + new_trans.page.split(' ').join('_') + "_" + new_trans.section + "_" + new_trans.index; // get the page to translate
                    fileEn.set(pg, req.body.original_text_en);
                    fileFr.set(pg, req.body.original_text_fr);
                    fileDe.set(pg, req.body.original_text_de);
                    fileAr.set(pg, req.body.original_text_ar);
                    fileIt.set(pg, req.body.original_text_it);
                    fileEs.set(pg, req.body.original_text_es);
                    filePt.set(pg, req.body.original_text_pt);
                    filePo.set(pg, req.body.original_text_po);
                    fileSv.set(pg, req.body.original_text_sv);
                    fileSu.set(pg, req.body.original_text_su);
                    fileNth.set(pg, req.body.original_text_nth);
                    fileFar.set(pg, req.body.original_text_far);
                    fileEn.save();
                    fileFr.save();
                    fileDe.save();
                    fileAr.save();
                    fileIt.save();
                    filePt.save();
                    filePo.save();
                    fileSv.save();
                    fileSu.save();
                    fileNth.save();
                    fileFar.save();
                    fileEs.save();
                    new_trans.reference = "ref_00" + new_trans.index;
                    new_trans.save();
                    res.status(200).json({
                        success: true,
                        message: "new text was added successfully"
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                });
            }).catch(err => {
                res.status(200).json({
                    message: err.message
                })
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    });
};





/*-----------------------------*/
/* EDIT TEXT */

exports.editText = (req, res) => {
    const t_en = req.body.text_en;
    const t_fr = req.body.text_fr;
    const t_de = req.body.text_de;
    Translation.findOne({
        where: {
            id: req.body.id
        }
    }).then(text => {

        if (!text) {
            res.status(200).json({
                success: false,
                message: "Text not found. Please try again"
            })
        } else {
            text.update(req.body).then(done => {
                const pg = text.page.split(' ').join('_') + "_" + text.section + "." + text.page.split(' ').join('_') + "_" + text.section + "_" + text.index; // get the page to translate
                fileEn.set(pg, req.body.original_text_en);
                fileFr.set(pg, req.body.original_text_fr);
                fileDe.set(pg, req.body.original_text_de);
                fileAr.set(pg, req.body.original_text_ar);
                fileIt.set(pg, req.body.original_text_it);
                fileEs.set(pg, req.body.original_text_es);
                filePt.set(pg, req.body.original_text_pt);
                filePo.set(pg, req.body.original_text_po);
                fileSv.set(pg, req.body.original_text_sv);
                fileSu.set(pg, req.body.original_text_su);
                fileNth.set(pg, req.body.original_text_nth);
                fileFar.set(pg, req.body.original_text_far);
                fileEn.save();
                fileFr.save();
                fileDe.save();
                fileAr.save();
                fileIt.save();
                filePt.save();
                filePo.save();
                fileSv.save();
                fileSu.save();
                fileNth.save();
                fileFar.save();
                fileEs.save();
            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })



        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })

}

/*-----------------------------*/
/* DELETE TEXT */

exports.deleteText = (req, res) => {

}


/*-----------------------------*/
/* EDIT TEXT'S GROUP */

exports.editTextsGroup = (req, res) => {
    const texts_group = req.body.array_texts;
    const ids_group = req.body.array_id;
    for (var i = 0; i < texts_group.length; i++) {
        for (var j = 0; j < ids_group; j++) {
            var text = Translation.findOne({
                where: {
                    id: parseInt(ids_group[j].innerText)
                }
            }).then(t => {
                if (!t) {
                    res.status(200).json({
                        success: false,
                        message: "Texts cannot be updated. please try again"
                    })
                } else {

                }

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                });
            });;
        }
    }

}
exports.gettranslatefile = (req, res) => {
    const filename = req.body.filename;

    try {
        let rawdata = fs.readFileSync("./translation/" + filename + ".json");

        var content = JSON.parse(rawdata);
        res.status(200).json(content)
    } catch (err) {
        res.status(500).json(err)
    }

}
exports.gettransfile = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let profilepic = fs.readFileSync('./translation/' + fileName)
    res.status(200).send(profilepic)
}