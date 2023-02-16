# Info libros Catedu

## Ejecución

```sh
# node --version
v18.1.0
# npm install
# npm start
```

## Despliegue

```sh
npm run build
npm run deploy
```

## Modificación cursos

- Cambiar fichero

```sh
/src/data/courses.json
```

- Hacer despliegue

## Despliegue actualizando datos


> 🚧 **Sólo la primera vez:**
>
>```python
>python3 -m venv venv
>source venv/bin/activate
>pip install -r requirements.txt
>```
>

Con las dependencias python instaladas, ejecutar:

```bash
source venv/bin/activate
make updatedeploy
deactivate
```
