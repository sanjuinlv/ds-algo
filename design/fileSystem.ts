/*
https://leetcode.com/problems/design-in-memory-file-system/
Category - Hard

Design a data structure that simulates an in-memory file system.


Implement the FileSystem class:

* FileSystem() Initializes the object of the system.
* List<String> ls(String path)
   - If path is a file path, returns a list that only contains this file's name.
   - If path is a directory path, returns the list of file and directory names in this directory.
   The answer should in lexicographic order.
* void mkdir(String path) Makes a new directory according to the given path. 
  The given directory path does not exist. If the middle directories in the path do not exist,
  you should create them as well.
* void addContentToFile(String filePath, String content)
    - If filePath does not exist, creates that file containing given content.
    - If filePath already exists, appends the given content to original content.
* String readContentFromFile(String filePath) Returns the content in the file at filePath.
 
Example 1:

Input
["FileSystem", "ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"]
[[], ["/"], ["/a/b/c"], ["/a/b/c/d", "hello"], ["/"], ["/a/b/c/d"]]
Output
[null, [], null, null, ["a"], "hello"]

Explanation
FileSystem fileSystem = new FileSystem();
fileSystem.ls("/");                         // return []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/");                         // return ["a"]
fileSystem.readContentFromFile("/a/b/c/d"); // return "hello"
 
Constraints:

 - 1 <= path.length, filePath.length <= 100
 - path and filePath are absolute paths which begin with '/' and do not end with
  '/' except that the path is just "/".
 - You can assume that all directory names and file names only contain lowercase
  letters, and the same names will not exist in the same directory.
 - You can assume that all operations will be passed valid parameters, and users
  will not attempt to retrieve file content or list a directory or file that does not exist.
 - 1 <= content.length <= 50
 - At most 300 calls will be made to ls, mkdir, addContentToFile, and readContentFromFile.
 */
/* 
Approach: 
Runtime: 129 ms, faster than 55.56% of TypeScript online submissions for Design In-Memory File System.
Memory Usage: 47.2 MB, less than 88.89% of TypeScript online submissions for Design In-Memory File System.
*/
class File {
  private _isFile: boolean;
  private _files: Map<string, File>;
  private _content: string;
  constructor() {
    this._content = "";
    this._files = new Map();
  }

  set isFile(isFile: boolean) {
    this._isFile = isFile;
  }

  get isFile(): boolean {
    return this._isFile === true;
  }

  set content(content: string) {
    this._content = content;
  }

  get content(): string {
    return this._content;
  }

  get files(): Map<string, File> {
    return this._files;
  }
}

class FileSystem {
  private root: File;
  constructor() {
    this.root = new File();
  }

  ls(path: string): string[] {
    // console.log(`path: ${path}`);
    let t: File | undefined = this.root;
    if (path !== "/") {
      const d = path.split("/");
      if (t) {
        for (let i = 1; i < d.length; i++) {
          if (t) {
            t = t.files.get(d[i]);
          }
        }
        //if this path is a file then return the file name itself
        if (t && t.isFile) {
          return [d[d.length - 1]];
        }
      }
    }
    // console.log(t.files);
    const result = t ? Array.from(t.files.keys()) : [];
    result.sort();
    return result;
  }

  mkdir(path: string): void {
    let t: File | undefined = this.root;
    const d = path.split("/");
    for (let i = 1; i < d.length; i++) {
      if (t) {
        if (t && !t.files.has(d[i])) {
          t.files.set(d[i], new File());
        }
        t = t.files.get(d[i]);
      }
    }
  }

  addContentToFile(filePath: string, content: string): void {
    let t: File | undefined = this.root;
    const d = filePath.split("/");
    for (let i = 1; i < d.length - 1; i++) {
      if (t) {
        t = t.files.get(d[i]);
      }
    }
    if (t && !t.files.has(d[d.length - 1])) {
      t.files.set(d[d.length - 1], new File());
    }
    t = t?.files.get(d[d.length - 1]);
    if (t) {
      t.isFile = true;
      t.content = t.content + content;
    }
  }

  readContentFromFile(filePath: string): string {
    let t: File | undefined = this.root;
    const d = filePath.split("/");
    for (let i = 1; i < d.length - 1; i++) {
      if (t) {
        t = t.files.get(d[i]);
      }
    }
    let content = t?.files.get(d[d.length - 1])?.content;
    return content ? content : "";
  }
}

export {};

/* 
Other Java solution

public class FileSystem {
    private FileNode root;

    public FileSystem() {
        root = new FileNode("");
    }

    public List<String> ls(String path) {
        return findNode(path).getList();
    }

    public void mkdir(String path) {
        findNode(path);
    }

    public void addContentToFile(String filePath, String content) {
        findNode(filePath).addContent(content);
    }

    public String readContentFromFile(String filePath) {
        return findNode(filePath).getContent();
    }

    //-- private method section --//
    private FileNode findNode(String path){
        String[] files = path.split("/");

        FileNode cur = root;
        for(String file : files){
            if(file.length() == 0) continue;

            cur.children.putIfAbsent(file, new FileNode(file));
            cur = cur.children.get(file);

            if(cur.isFile()) break;
        }

        return cur;
    }

   // Private class
   private class FileNode{
        private TreeMap<String, FileNode> children;
        private StringBuilder file;
        private String name;

        public FileNode(String name) {
            children = new TreeMap<>();
            file = new StringBuilder();
            this.name = name;
        }

        public String getContent(){
            return file.toString();
        }

        public String getName(){
            return name;
        }

        public void addContent(String content){
            file.append(content);
        }

        public boolean isFile(){
            return file.length() > 0;
        }

        public List<String> getList(){
            List<String> list = new ArrayList<>();
            if(isFile()){
                list.add(getName());
            }else{
                list.addAll(children.keySet());
            }

            return list;
        }
    }
}

II:
class FileSystem {
    private final FileComponent root;
    
    // private classes
    private abstract class FileComponent {
        protected final String name;
        
        private FileComponent(String name) {
            this.name = name;
        }

        protected abstract List<String> getList();

        protected String getContent() {
            throw new UnsupportedOperationException();
        }

        protected FileComponent getChild(String s) {
            throw new UnsupportedOperationException();
        }

        protected FileComponent add(String s, FileComponent f) {
            throw new UnsupportedOperationException();
        }

        protected void addContent(String data) {
            throw new UnsupportedOperationException();
        }
    }

    private class Folder extends FileComponent {
        private Map<String, FileComponent> dirs;

        private Folder(String name) {
            super(name);
            dirs = new TreeMap<>();
        }

        protected List<String> getList() {
            return new ArrayList<>(dirs.keySet());
        }

        @Override
        protected FileComponent getChild(String s) {
            return dirs.get(s);
        }

        @Override
        protected FileComponent add(String s, FileComponent f) {
            dirs.put(s, f);
            return f;
        }
    }

    private class File extends FileComponent {
        private final StringBuilder content;

        private File(String name) {
            super(name);
            this.content = new StringBuilder();
        }

        protected List<String> getList() {
            return List.of(name);
        }

        @Override
        protected String getContent() {
            return content.toString();
        }

        @Override
        protected void addContent(String data) {
            content.append(data);
        }
    }

    // constructor
    public FileSystem() {
        root = new Folder("");
    }

    // public methods...
    public List<String> ls(String path) {
        return getComponent(path).getList();
    }

    public void mkdir(String path) {
        setComponents(path, false);
    }

    public void addContentToFile(String filePath, String content) {
        setComponents(filePath, true).addContent(content);
    }

    public String readContentFromFile(String filePath) {
        FileComponent node = getComponent(filePath);
        if (node == null) throw new IllegalArgumentException("invalid filepath");
        return node.getContent();
    }
    
    // private methods...
    private FileComponent getComponent(String path) {
        String[] nodes = path.split("/");
        FileComponent f = root;
        for (int i = 1; i < nodes.length && f != null; i++)
            f = f.getChild(nodes[i]);
        return f;
    }

    private FileComponent setComponents(String path, boolean isFilePath) {
        String[] nodes = path.split("/");
        FileComponent f = root, next;
        for (int i = 1; i < nodes.length; i++, f = next) {
            next = f.getChild(nodes[i]);
            if (next == null) next = f.add(nodes[i], (i == nodes.length-1 && isFilePath) ? new File(nodes[i]) : new Folder(nodes[i]));
        }
        return f;
    }
}
*/
/* 
File system with Filter
class File {
    String name;
    int size;
    int type;
    boolean isDirectory;
    File[] children;
}

abstract class Filter {
    abstract boolean apply(File file);
}

class MinSizeFilter extends Filter {

    int minSize;

    public MinSizeFilter(int minSize) {
        this.minSize = minSize;
    }

    @Override
    boolean apply(File file) {
        return file.size > minSize;
    }
}

class TypeFilter extends Filter {

    int type;

    public TypeFilter(int type) {
        this.type = type;
    }

    @Override
    boolean apply(File file) {
        return file.type == type;
    }
}

class FindCommand {

    public List<File> findWithFilters(File directory, List<Filter> filters) {
        if (!directory.isDirectory) {
            return new NotADirectoryException();
        }
        List<File> output = new ArrayList<>();
        findWithFilters(directory, filters, output);
        return output;
    }

    private void findWithFilters(File directory, List<Filter> filters, List<File> output) {
        if (directory.children == null) {
            return;
        }
        for (File file : directory.children) {
            if (file.isDirectory) {
                findWithFilters(file, filters, output);
            } else {
                boolean selectFile = true;
                for (Filter filter : filters) {
                    if (!filter.apply(file)) {
                        selectFile = false;
                    }
                }
                if (selectFile) {
                    output.add(file);
                }
            }
        }
    }
}
*/
