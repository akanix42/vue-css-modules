import meteorProjectPath from 'meteor-project-path';
import path from 'path';

export default function getAbsoluteImportPath(relativePath) {
  if (path.isAbsolute(relativePath)) {
    return relativePath.replace(/\\/g, '/');
  }

  return path.join(meteorProjectPath, relativePath).replace(/\\/g, '/');
}
