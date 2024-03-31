from SkinTumor_SVM import testGrouped, tests
import SkinTumor_SVM

print(SkinTumor_SVM.tests('Test\n\n\n'))
# print(SkinTumor_SVM.testGrouped('data/test/malignant/1.jpg'))
# print(SkinTumor_SVM.main())
print("Generating saliency map")
SkinTumor_SVM.generateSaliencyMap('./data/test/malignant/17.jpg') #USE THIS TO DISPLAY THE SALIENCY MAP

