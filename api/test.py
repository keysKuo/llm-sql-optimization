import os

def test_dir_and_file():
    # Kiểm tra thư mục
    directory_path = 'prompts'
    if not os.path.isdir(directory_path):
        print(f"Thư mục '{directory_path}' không tồn tại.")
    else:
        print(f"Thư mục '{directory_path}' tồn tại.")

    # Kiểm tra tệp
    file_path = 'prompts/instruction.md'
    if not os.path.isfile(file_path):
        print(f"Tệp '{file_path}' không tồn tại.")
    else:
        print(f"Tệp '{file_path}' tồn tại.")
        
test_dir_and_file()