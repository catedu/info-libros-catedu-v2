from pathlib import Path
import shutil

import pandas as pd
import requests
import numpy as np
from slugify import slugify
from PIL import Image

# function to reduce the size of the image
def reduce_image_size(image_path):
    try:
        img = Image.open(image_path)
        img.save(image_path, optimize=True, quality=65)
    except Exception as e:
        print(e)


def download_and_format_image_path(url):
    try:
        path = Path(url)
        ref_path = f"images/{slugify(path.stem)}{path.suffix}"
        output_path = f"public/{ref_path}"
        file_path = Path(output_path)
        if not file_path.exists():
            r = requests.get(url)
            with open(output_path, "wb") as f:
                f.write(r.content)
            reduce_image_size(output_path)
        return ref_path
    except Exception as e:
        print(e)


def get_status(curso, moodle_url, portada):
    try:
        # compare if the three parameters are nan and exit the function if they are
        if pd.isna(curso) and pd.isna(moodle_url) and pd.isna(portada):
            return
        elif moodle_url.startswith("https"):
            r = requests.get(portada)
            if r.status_code != 200:
                print(f"El curso [{curso}]({moodle_url}) no tiene portada")
            else:
                download_and_format_image_path(portada)
        else:
            print(
                f"Faltan datos:\nCurso: {curso}\nMoodle: {moodle_url}\nPortada: {portada}"
            )
    except Exception:
        print(
            f"Con los siguientes datos, algo ha fallado:\nCurso: {curso}\nMoodle: {moodle_url}\nPortada: {portada}"
        )


# Descargo el csv creando un DataFrame
df = pd.read_csv(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-BAUvNUjp2AeV_daeeqHReX0M3ew3ZpEL3nfkrz96uUd816mV_hV1uWMvbsACphEBGjqHJBswGwFz/pub?gid=614465369&single=true&output=csv"
)

# Creo una columna con el path de la imagen y creo otro csv
df["Portada"] = df["Portada"].replace(np.nan, "", regex=True)
df["Images"] = df["Portada"].apply(lambda x: download_and_format_image_path(x))
# df["id"] = df["Moodle_url"].fillna("").apply(lambda x: x.split("id=")[-1] if x.startswith("http") else "")
df['id'] = df.index.astype(str)
df1 = df.filter(regex="\d\.\d").fillna("").astype(str)
# df["Competencias"] = (
#     df1.filter(regex="\d\.\d")
#     .apply(
#         lambda x: f"|{'|'.join(x.index)}|\n|{':---:|'*len(x.values)}\n|{'|'.join(x.values)}|",
#         axis=1,
#     )
#     .str.replace("nan", "")
# )

df = df[(df["Curso Escolar"] == "2022-23") & ((df["Convocatoria"] == 1) | (df["Convocatoria"] == 2))]

# df['Course_id'] = df['Moodle_url'].apply(lambda x: x.split('/')[-1].split('=')[-1])
final_df = pd.concat([df[
    [
        "id",
        "Curso",
        "Descripción",
        "Objetivos",
        "Contenidos",
        "Etiquetas",
        "Libros",
        "Moodle_url",
        "Images",
        "Portada",
        "Horas",
        # "Competencias"
        # "Course_id",
    ]], df1], axis=1)

final_df[final_df["Curso"].notna()].to_json("src/data/courses.json", orient="records", force_ascii=False)