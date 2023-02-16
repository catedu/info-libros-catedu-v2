testlocalupdated:
	python prepare_json.py
	npm run start

updatedeploy:
	python prepare_json.py
	npm run build
	npm run deploy