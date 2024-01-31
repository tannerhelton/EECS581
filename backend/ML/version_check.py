import importlib

packages = ["numpy", "flask", "matplotlib", "pandas", "seaborn", "sklearn"]

for package in packages:
    try:
        # Import the module dynamically
        module = importlib.import_module(package)

        # Some packages have different attribute names for version, handling those cases
        if package == "sklearn":
            # For sklearn, the version information is under sklearn.__version__
            print(f"{package}: {module.__version__}")
        else:
            # For most other packages, the version information is directly under module.__version__
            print(f"{package}: {module.__version__}")
    except ImportError:
        print(f"{package}: Not installed")
    except AttributeError:
        print(f"{package}: Version attribute not found")