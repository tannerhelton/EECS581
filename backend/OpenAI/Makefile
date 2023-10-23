app: app.py
	@echo "Running app.py"
	@python3 app.py

requirements:
	@echo "Creating requirements.txt"
	@echo "openai==0.28.1" > requirements.txt
	@echo "python-dotenv==1.0.0" >> requirements.txt

packages: requirements
	@echo "Installing packages"
	@pip3 install -r requirements.txt