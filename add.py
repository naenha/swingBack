import sys
def add(n1, n2):
    sum = int(n1) + int(n2)
    print(sum)
if __name__ == '__main__':
    add(sys.argv[1], sys.argv[2])