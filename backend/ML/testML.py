from SkinTumor_SVM import testGrouped, tests
import SkinTumor_SVM

print(SkinTumor_SVM.generateSaliencyMapTest('data/test/malignant/1.jpg'))
print("Setting up Models...")
print("Running test grouped...")
benign_train_path = './data/train/benign'
malignant_train_path = './data/train/malignant'
benign_test_path = './data/test/benign'
malignant_test_path = './data/test/malignant'

SkinTumor_SVM.setup_global_models(benign_train_path, malignant_train_path, benign_test_path, malignant_test_path)
benign_prob, malignant_prob = SkinTumor_SVM.testGrouped('./data/test/malignant/17.jpg')
print(f"Benign Probability: {benign_prob}, Malignant Probability: {malignant_prob}")
# print(SkinTumor_SVM.main())
# print("Generating saliency map")
# SkinTumor_SVM.generateSaliencyMap('./data/test/malignant/17.jpg') #USE THIS TO DISPLAY THE SALIENCY MAP

